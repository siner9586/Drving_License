import { NextRequest, NextResponse } from "next/server";
import { readPayload } from "@/lib/api";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { getMockDataset } from "@/lib/mock-data";
import { detectRisk } from "@/lib/risk";
import { recordRiskEvent } from "@/lib/data";
import { refundSchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json({ data: getMockDataset().refunds, message: "退款 API 可用，请使用 POST 提交退款申请。" });
}

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const parsed = refundSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "表单校验失败" }, { status: 400 });
  const risk = detectRisk(parsed.data.reason);
  if (risk.blocked) return NextResponse.json({ message: risk.message, risk }, { status: 422 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ message: "退款申请已提交，演示模式返回退款编号。", id: `refund_${Date.now()}`, risk });
  }
  const refund = await prisma.refund.create({
    data: {
      orderId: parsed.data.orderId,
      reason: parsed.data.reason,
      requestedAmount: parsed.data.requestedAmount,
      status: risk.riskFlag ? "REVIEWING" : "SUBMITTED",
      note: "按平台退款规则核算。"
    }
  });
  if (risk.riskFlag) await recordRiskEvent("REFUND", refund.id, parsed.data.reason, risk.keywords[0], risk.level);
  return NextResponse.json({ message: "退款申请已提交", id: refund.id, risk });
}
