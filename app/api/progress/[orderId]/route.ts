import { NextRequest, NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/db";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  const payload = (await request.json()) as {
    currentStage?: string;
    nextStep?: string;
    teacherNote?: string;
    managerNote?: string;
  };
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ message: "演示模式已模拟更新学员进度", orderId, data: payload });
  }
  const progress = await prisma.studentProgress.upsert({
    where: { orderId },
    update: {
      currentStage: (payload.currentStage || "FIELD_TRAINING") as never,
      nextStep: payload.nextStep || "按基地班主任通知完成下一阶段训练。",
      teacherNote: payload.teacherNote || "后台更新训练备注。",
      managerNote: payload.managerNote || "后台更新基地备注。",
      updatedBy: "后台演示账号"
    },
    create: {
      orderId,
      currentStage: (payload.currentStage || "FIELD_TRAINING") as never,
      theoryStatus: "学习中",
      fieldTrainingStatus: "按计划训练",
      roadTrainingStatus: "待安排",
      examBookingNote: "考试预约及结果以当地交管部门规则为准。",
      nextStep: payload.nextStep || "按基地班主任通知完成下一阶段训练。",
      teacherNote: payload.teacherNote || "后台创建训练备注。",
      managerNote: payload.managerNote || "后台创建基地备注。",
      updatedBy: "后台演示账号"
    }
  });
  return NextResponse.json({ message: "学员进度已更新", data: progress });
}
