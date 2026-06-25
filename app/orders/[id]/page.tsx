import { notFound } from "next/navigation";
import { AlertTriangle, RefreshCcw, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { ORDER_STATUS_LABEL, PROGRESS_STAGE_LABEL } from "@/lib/constants";
import { getOrderById, getProgressList } from "@/lib/data";
import { currency, formatDate } from "@/lib/format";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();
  const progress = (await getProgressList()).find((item) => item.orderId === order.id);

  return (
    <div className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_340px]">
      <div className="grid gap-6">
        <Card>
          <Badge tone="blue">{ORDER_STATUS_LABEL[order.status]}</Badge>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">{order.orderNo}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {order.studentName} · 手机尾号 {order.phoneTail} · {order.baseName} · {order.packageName}
          </p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-slate-950">子订单</h2>
          <DataTable
            className="mt-4"
            columns={["类型", "名称", "金额", "说明"]}
            rows={order.items.map((item) => [item.type, item.name, currency(item.amount), item.description])}
          />
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-slate-950">费用明细</h2>
          <DataTable
            className="mt-4"
            columns={["项目", "金额"]}
            rows={[
              ["订单总额", currency(order.totalAmount)],
              ["已支付", currency(order.paidAmount)],
              ["待支付", currency(Math.max(0, order.totalAmount - order.paidAmount))]
            ]}
          />
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-slate-950">订单时间线</h2>
          <div className="mt-4 grid gap-3">
            {order.timeline.map((item) => (
              <div key={`${item.time}-${item.title}`} className="rounded-md bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-950">{item.title} · {formatDate(item.time)}</div>
                <div className="mt-1 text-sm text-slate-600">{item.description}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-slate-950">报到须知、学员进度与基地备注</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Info title="报到须知" text="按基地确认单携带身份证明、体检材料和订单确认信息。" />
            <Info title="当前进度" text={progress ? `${PROGRESS_STAGE_LABEL[progress.currentStage]}：${progress.nextStep}` : "等待基地更新。"} />
            <Info title="基地备注" text={progress?.managerNote || "基地暂无补充备注。"} />
          </div>
        </Card>
      </div>
      <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
        <Card>
          <div className="text-sm text-slate-500">订单金额</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">{currency(order.totalAmount)}</div>
          <div className="mt-2 text-sm text-slate-600">支付状态：{order.paymentStatus}</div>
        </Card>
        <LinkButton href="/api/complaints" variant="outline" icon={<AlertTriangle className="h-4 w-4" />}>投诉入口</LinkButton>
        <LinkButton href="/api/refunds" variant="outline" icon={<RefreshCcw className="h-4 w-4" />}>退款入口</LinkButton>
        <LinkButton href="/api/reviews" variant="outline" icon={<Star className="h-4 w-4" />}>评价入口</LinkButton>
      </aside>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
