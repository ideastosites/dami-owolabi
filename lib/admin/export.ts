import ExcelJS from "exceljs";
import type { PaymentRecord } from "@/lib/payments/store";
import type { WaitlistRecord } from "@/lib/waitlist/store";

function newest<T extends { createdAt: string }>(records: T[]): T[] {
  return [...records].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function buildPaymentsWorkbook(records: PaymentRecord[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Payments");

  sheet.columns = [
    { header: "Date", key: "date", width: 20 },
    { header: "Status", key: "status", width: 12 },
    { header: "Name", key: "name", width: 24 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Course / Product", key: "product", width: 36 },
    { header: "Amount (NGN)", key: "amount", width: 16 },
    { header: "Reference", key: "reference", width: 40 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const r of newest(records)) {
    sheet.addRow({
      date: new Date(r.createdAt).toLocaleString("en-NG"),
      status: r.status,
      name: r.customerName,
      email: r.customerEmail,
      phone: r.customerPhone,
      product: r.productName,
      amount: r.amount,
      reference: r.transactionReference,
    });
  }

  return Buffer.from(await workbook.xlsx.writeBuffer());
}

export async function buildWaitlistWorkbook(records: WaitlistRecord[]): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Waitlist");

  sheet.columns = [
    { header: "Date", key: "date", width: 20 },
    { header: "Name", key: "name", width: 24 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 18 },
    { header: "Course", key: "course", width: 36 },
    { header: "Location", key: "location", width: 24 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const r of newest(records)) {
    sheet.addRow({
      date: new Date(r.createdAt).toLocaleString("en-NG"),
      name: r.customerName,
      email: r.customerEmail,
      phone: r.customerPhone,
      course: r.courseTitle,
      location: r.location,
    });
  }

  return Buffer.from(await workbook.xlsx.writeBuffer());
}
