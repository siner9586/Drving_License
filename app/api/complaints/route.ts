import { NextRequest, NextResponse } from "next/server";
import { boolValue, readPayload } from "@/lib/api";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { getMockDataset } from "@/lib/mock-data";
import { detectRisk } from "@/lib/risk";
import { recordRiskEvent } from "@/lib/data";
import { complaintSchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json({ data: getMockDataset().complaints, message: "投诉 API 可用，请使用 POST 提交投诉。" });
}

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const parsed = complaintSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "表单校验失败" }, { status: 400 });
  const risk = detectRisk(parsed.data.content);
  if (risk.blocked) return NextResponse.json({ message: risk.message, risk }, { status: 422 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ message: "投诉已提交，演示模式返回工单编号。", id: `complaint_${Date.now()}`, risk });
  }
  const complaint = await prisma.complaint.create({
    data: {
      orderId: parsed.data.orderId,
      baseId: parsed.data.baseId,
      type: parsed.data.type,
      severity: boolValue(payload.urgent) ? "HIGH" : "MEDIUM",
      content: parsed.data.content,
      status: risk.riskFlag ? "ARBITRATING" : "SUBMITTED"
    }
  });
  if (risk.riskFlag) await recordRiskEvent("COMPLAINT", complaint.id, parsed.data.content, risk.keywords[0], risk.level);
  return NextResponse.json({ message: "投诉已提交", id: complaint.id, risk });
}
