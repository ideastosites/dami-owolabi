import { promises as fs } from "fs";
import path from "path";

export type WaitlistRecord = {
  courseId: string;
  courseTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  location: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

// Same pattern as lib/payments/store.ts — a queued JSON file rather than an
// external DB, since this runs as a single always-on process on cPanel.
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const result = queue.then(task, task);
  queue = result.catch(() => undefined);
  return result;
}

async function readAllUnsafe(): Promise<WaitlistRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistRecord[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAllUnsafe(records: WaitlistRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmpFile = `${DATA_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(records, null, 2), { mode: 0o600 });
  await fs.rename(tmpFile, DATA_FILE);
}

export function getAllWaitlistEntries(): Promise<WaitlistRecord[]> {
  return enqueue(() => readAllUnsafe());
}

export function addWaitlistEntry(record: WaitlistRecord): Promise<WaitlistRecord> {
  return enqueue(async () => {
    const records = await readAllUnsafe();
    records.push(record);
    await writeAllUnsafe(records);
    return record;
  });
}
