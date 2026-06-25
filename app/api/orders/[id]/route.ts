import { NextRequest, NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { getOrderById } from "@/lib/data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) return NextResponse.json({ message: "订单不存在" }, { status: 404 });
  return NextResponse.json({ data: order });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const payload = (await request.json()) as { status?: string };
  if (!payload.status) return NextResponse.json({ message: "status 必填" }, { status: 400 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ message: "演示模式已模拟更新订单状态", id, status: payload.status });
  }
  const order = await prisma.order.update({
    where: { id },
    data: { status: payload.status as never }
  });
  return NextResponse.json({ message: "订单状态已更新", data: order });
}
