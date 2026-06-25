import { NextRequest, NextResponse } from "next/server";
import { boolValue, readPayload } from "@/lib/api";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { enterpriseLeadSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const parsed = enterpriseLeadSchema.safeParse({
    ...payload,
    needAccommodation: boolValue(payload.needAccommodation),
    needMeals: boolValue(payload.needMeals)
  });
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message || "表单校验失败" }, { status: 400 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ message: "企业团训线索已提交，演示模式返回线索编号。", id: `enterprise_${Date.now()}` });
  }
  const lead = await prisma.enterpriseLead.create({
    data: {
      ...parsed.data,
      expectedTrainingDate: parsed.data.expectedTrainingDate ? new Date(parsed.data.expectedTrainingDate) : null
    }
  });
  return NextResponse.json({ message: "企业团训线索已提交", id: lead.id });
}
