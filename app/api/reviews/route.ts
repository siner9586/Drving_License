import { NextRequest, NextResponse } from "next/server";
import { readPayload } from "@/lib/api";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { getMockDataset } from "@/lib/mock-data";
import { detectRisk } from "@/lib/risk";
import { recordRiskEvent } from "@/lib/data";
import { reviewSchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json({ data: getMockDataset().reviews, message: "评价 API 可用，请使用 POST 提交评价。" });
}

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const parsed = reviewSchema.safeParse(payload);
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "表单校验失败" }, { status: 400 });
  const risk = detectRisk(parsed.data.content);
  if (risk.blocked) return NextResponse.json({ message: risk.message, risk }, { status: 422 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ message: "评价已提交，演示模式返回评价编号。", id: `review_${Date.now()}`, risk });
  }
  const review = await prisma.review.create({
    data: {
      orderId: parsed.data.orderId,
      baseId: parsed.data.baseId,
      rating: parsed.data.rating,
      content: parsed.data.content,
      tags: parsed.data.tags?.split(/[,\s，、]+/).filter(Boolean) || [],
      status: risk.riskFlag ? "RISK_REVIEW" : "PUBLISHED"
    }
  });
  if (risk.riskFlag) await recordRiskEvent("REVIEW", review.id, parsed.data.content, risk.keywords[0], risk.level);
  return NextResponse.json({ message: "评价已提交", id: review.id, risk });
}
