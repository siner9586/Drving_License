import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { COMPLIANCE_NOTICE } from "@/lib/constants";
import { getPackageById } from "@/lib/data";
import { currency, formatDate } from "@/lib/format";

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pack = await getPackageById(id);
  if (!pack) notFound();

  return (
    <div className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_340px]">
      <div className="grid gap-6">
        <Card>
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue">{pack.licenseType}</Badge>
            {pack.includesAccommodation ? <Badge tone="green">含住宿</Badge> : null}
            {pack.includesMeals ? <Badge tone="green">含餐</Badge> : null}
            {pack.supportsPickup ? <Badge tone="slate">支持接站</Badge> : null}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">{pack.name}</h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            所属基地：{pack.baseName} · {pack.baseProvince} {pack.baseCity}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{pack.description}</p>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-slate-950">服务内容与训练安排</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Info title="适用人群" items={[pack.targetUsers]} />
            <Info title="训练安排" items={pack.trainingPlan} />
            <Info title="住宿安排" items={[pack.accommodationPlan]} />
            <Info title="餐饮安排" items={[pack.mealPlan]} />
            <Info title="接站安排" items={[pack.pickupPlan]} />
            <Info title="服务亮点" items={pack.serviceItems} />
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-slate-950">价格明细</h2>
          <DataTable
            className="mt-4"
            columns={["费用项", "金额", "说明"]}
            rows={[
              ["培训费", currency(pack.trainingFee), "教练训练、排班和进度跟踪"],
              ["住宿费", currency(pack.dormitoryFee), pack.includesAccommodation ? "班型包含基础床位" : "可选"],
              ["餐饮费", currency(pack.mealFee), pack.includesMeals ? "班型包含基础餐标" : "可选"],
              ["接站费", currency(pack.pickupFee), pack.supportsPickup ? "预约接站" : "不含"],
              ["体检/考试/模拟/补考", "按实际", pack.examFeeNote]
            ]}
          />
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-slate-950">开班日期与剩余名额</h2>
          <DataTable
            className="mt-4"
            columns={["开班日期", "结束日期", "容量", "剩余名额", "状态"]}
            rows={pack.sessions.map((session) => [
              formatDate(session.startDate),
              formatDate(session.endDate),
              session.capacity,
              session.remainingSeats,
              session.status
            ])}
          />
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-slate-950">报名材料、报到流程与增值服务</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Info title="报名材料" items={pack.registrationMaterials} />
            <Info title="报到流程" items={["订单确认", "资料核验", "宿舍餐饮登记", "训练排班"]} />
            <Info title="可选增值服务" items={pack.valueAddedServices} />
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-slate-950">不承诺事项、退款规则与平台保障</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Info title="不承诺事项" items={[pack.complianceNote]} />
            <Info title="退款规则" items={[pack.refundRule]} />
            <Info title="平台保障" items={["订单留痕", "投诉入口", "退款核算", "进度跟踪"]} />
          </div>
        </Card>
      </div>
      <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
        <Card>
          <div className="text-sm text-slate-500">班型价格</div>
          <div className="mt-2 text-3xl font-bold text-blue-700">{currency(pack.price)}</div>
          <div className="mt-2 text-sm text-slate-600">{pack.durationText}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            合规提示
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{COMPLIANCE_NOTICE} {pack.complianceNote}</p>
        </Card>
        <LinkButton href={`/apply?packageId=${pack.id}`} className="w-full" icon={<ArrowRight className="h-4 w-4" />}>
          立即报名
        </LinkButton>
      </aside>
    </div>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
