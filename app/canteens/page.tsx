import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { DataTable } from "@/components/ui/table";
import { currency } from "@/lib/format";
import { getMockDataset } from "@/lib/mock-data";

export default function CanteensPage() {
  const { canteens } = getMockDataset();
  return (
    <div className="container-page py-8">
      <SectionHeader title="食堂展示" description="展示每日餐次、餐标、容量、清真餐、素食、企业团餐、单独购餐、食品安全承诺和投诉渠道。" />
      <div className="grid gap-4 lg:grid-cols-2">
        {canteens.map((canteen) => (
          <Card key={canteen.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-slate-500">{canteen.baseName}</div>
                <h2 className="mt-1 text-xl font-bold text-slate-950">{canteen.name}</h2>
              </div>
              <Badge tone="green">日供餐 {canteen.dailyCapacity}</Badge>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{canteen.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="blue">每日 {canteen.mealCountPerDay} 餐</Badge>
              {canteen.supportsHalal ? <Badge tone="slate">清真餐</Badge> : null}
              {canteen.supportsVegetarian ? <Badge tone="slate">素食</Badge> : null}
              {canteen.supportsEnterpriseMeal ? <Badge tone="amber">企业团餐</Badge> : null}
              <Badge tone="green">支持单独购餐</Badge>
            </div>
            <DataTable
              className="mt-4"
              columns={["餐标", "价格", "餐次", "说明"]}
              rows={canteen.mealPlans.map((plan) => [plan.name, currency(plan.pricePerDay), plan.meals.join(" / "), plan.description])}
            />
            <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
              <p>食品安全承诺：{canteen.foodSafetyNote}</p>
              <p>食堂管理制度：留样、消毒、台账、健康证明和投诉处理闭环。</p>
              <p>投诉渠道：{canteen.complaintChannel}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
