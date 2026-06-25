import { NextRequest, NextResponse } from "next/server";
import { readPayload } from "@/lib/api";
import { createOrder, listOrders } from "@/lib/data";

export async function GET() {
  const orders = await listOrders();
  return NextResponse.json({ data: orders });
}

export async function POST(request: NextRequest) {
  const payload = await readPayload(request);
  const baseId = String(payload.baseId || "");
  const packageId = String(payload.packageId || "");
  if (!baseId || !packageId) {
    return NextResponse.json({ message: "baseId 和 packageId 必填" }, { status: 400 });
  }
  const result = await createOrder({
    baseId,
    packageId,
    applicationId: payload.applicationId ? String(payload.applicationId) : undefined,
    userId: payload.userId ? String(payload.userId) : undefined
  });
  if (!result.ok) return NextResponse.json({ message: "订单创建失败" }, { status: 500 });
  return NextResponse.json({ message: "订单已创建", orderNo: result.order?.orderNo, data: result.order });
}
