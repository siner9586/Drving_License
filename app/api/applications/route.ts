import { NextRequest, NextResponse } from "next/server";
import { boolValue, readPayload } from "@/lib/api";
import { createApplication } from "@/lib/data";
import { applicationSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const parsed = applicationSchema.safeParse({
    ...payload,
    needAccommodation: boolValue(payload.needAccommodation),
    needMeals: boolValue(payload.needMeals),
    needPickup: boolValue(payload.needPickup),
    isEnterprise: boolValue(payload.isEnterprise),
    agreeRules: boolValue(payload.agreeRules),
    agreePrivacy: boolValue(payload.agreePrivacy)
  });
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "表单校验失败" }, { status: 400 });
  }
  const result = await createApplication(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ message: result.risk.message, risk: result.risk }, { status: 422 });
  }
  return NextResponse.json({
    message: "报名申请已提交，平台将进入基地确认流程。",
    id: result.application?.id,
    risk: result.risk
  });
}
