import { AlertTriangle, MessageSquare, RefreshCcw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { listOrders } from "@/lib/data";
import { currency } from "@/lib/format";

export default async function OrdersPage() {
  const orders = await listOrders();
  return (
    <div className="container-page py-8">
      <SectionHeader title="订单中心" description="展示报名订单、状态流、下一步事项，以及退款、投诉和评价入口。" />
      <div className="grid gap-4">
        {orders.slice(0, 24).map((order) => (
          <Card key={order.id}>
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="blue">{ORDER_STATUS_LABEL[order.status]}</Badge>
                  <span className="text-sm font-semibold text-slate-500">{order.orderNo}</span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-slate-950">{order.baseName}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {order.packageName} · {order.licenseType} · 住宿 {order.accommodation ? "是" : "否"} · 餐饮 {order.meals ? "是" : "否"} · 接站 {order.pickup ? "是" : "否"}
                </p>
                <p className="mt-2 text-sm text-slate-500">下一步事项：{order.nextStep}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-slate-500">总价</div>
                  <div className="font-bold text-slate-950">{currency(order.totalAmount)}</div>
                </div>
                <div className="rounded-md bg-slate-50 p-3">
                  <div className="text-slate-500">已支付</div>
                  <div className="font-bold text-slate-950">{currency(order.paidAmount)}</div>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                <LinkButton href={`/orders/${order.orderNo}`} variant="outline">查看详情</LinkButton>
                <LinkButton href="/api/refunds" variant="ghost" icon={<RefreshCcw className="h-4 w-4" />}>申请退款</LinkButton>
                <LinkButton href="/api/complaints" variant="ghost" icon={<AlertTriangle className="h-4 w-4" />}>发起投诉</LinkButton>
                <LinkButton href="/api/reviews" variant="ghost" icon={<Star className="h-4 w-4" />}>评价</LinkButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-6 border-blue-100 bg-blue-50">
        <div className="flex gap-2 text-sm leading-6 text-blue-800">
          <MessageSquare className="mt-1 h-4 w-4" />
          投诉、退款和评价入口第一版通过 API 和后台演示流实现，真实支付与客服工单可在 P1 接入。
        </div>
      </Card>
    </div>
  );
}
