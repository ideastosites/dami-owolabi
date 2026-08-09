import { promises as fs } from "fs";
import path from "path";

export type PaymentStatus = "pending" | "paid" | "failed" | "abandoned";

export type PaymentRecord = {
  transactionReference: string;
  productId: string;
  productName: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: PaymentStatus;
  paymentRedirectUrl?: string;
  rawVerifyResponse?: unknown;
  createdAt: string;
  paidAt?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "payments.json");

// All reads/writes are funneled through this promise chain so concurrent
// requests in the same process never interleave a read-modify-write cycle.
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = queue.then(task, task);
  queue = result.catch(() => undefined);
  return result;
}

async function readAllUnsafe(): Promise<PaymentRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as PaymentRecord[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAllUnsafe(records: PaymentRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmpFile = `${DATA_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(records, null, 2), {
    mode: 0o600,
  });
  await fs.rename(tmpFile, DATA_FILE);
}

export function findPayment(transactionReference: string): Promise<PaymentRecord | undefined> {
  return enqueue(async () => {
    const records = await readAllUnsafe();
    return records.find((r) => r.transactionReference === transactionReference);
  });
}

export function createPayment(record: PaymentRecord): Promise<PaymentRecord> {
  return enqueue(async () => {
    const records = await readAllUnsafe();
    records.push(record);
    await writeAllUnsafe(records);
    return record;
  });
}

export function updatePayment(
  transactionReference: string,
  patch: Partial<PaymentRecord>
): Promise<PaymentRecord | undefined> {
  return enqueue(async () => {
    const records = await readAllUnsafe();
    const index = records.findIndex((r) => r.transactionReference === transactionReference);
    if (index === -1) return undefined;
    records[index] = { ...records[index], ...patch };
    await writeAllUnsafe(records);
    return records[index];
  });
}

export function findStalePending(olderThanMinutes: number): Promise<PaymentRecord[]> {
  return enqueue(async () => {
    const records = await readAllUnsafe();
    const cutoff = Date.now() - olderThanMinutes * 60 * 1000;
    return records.filter(
      (r) => r.status === "pending" && new Date(r.createdAt).getTime() < cutoff
    );
  });
}
