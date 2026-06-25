import { NextRequest, NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/db";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = (await request.json()) as { status?: string; stage?: string; note?: string; auditor?: string };
  if (!payload.status) return NextResponse.json({ message: "status 必填" }, { status: 400 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ message: "演示模式已模拟审核动作", applicationId: id, status: payload.status });
  }
  const audit = await prisma.franchiseAudit.create({
    data: {
      applicationId: id,
      stage: (payload.stage || "MATERIAL") as never,
      status: payload.status as never,
      auditor: payload.auditor || "平台审核员",
      note: payload.note || "后台演示审核记录"
    }
  });
  await prisma.franchiseApplication.update({
    where: { id },
    data: { status: payload.status === "PASSED" ? "PRE_REVIEW" : "MATERIAL_REQUIRED" }
  });
  return NextResponse.json({ message: "审核记录已写入", data: audit });
}
