import { NextRequest, NextResponse } from "next/server";
import { boolValue, readPayload } from "@/lib/api";
import { createFranchiseApplication } from "@/lib/data";
import { franchiseSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const parsed = franchiseSchema.safeParse({
    ...payload,
    hasDormitory: boolValue(payload.hasDormitory),
    hasCanteen: boolValue(payload.hasCanteen),
    supportsPickup: boolValue(payload.supportsPickup),
    supportsFemaleDorm: boolValue(payload.supportsFemaleDorm),
    canServeNationalStudents: boolValue(payload.canServeNationalStudents)
  });
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "表单校验失败" }, { status: 400 });
  }
  const result = await createFranchiseApplication(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ message: result.risk.message, risk: result.risk }, { status: 422 });
  }
  return NextResponse.json({ message: "加盟申请已提交，进入平台审核队列。", id: result.application?.id, risk: result.risk });
}
