import { MetricsGrid, OperatorTables } from "@/components/admin/dashboard-panels";
import { SectionHeader } from "@/components/ui/section";
import { getDashboard } from "@/lib/data";

export default async function OperatorPage() {
  const data = await getDashboard("operator");
  return (
    <div className="container-page py-8">
      <SectionHeader title="区域运营后台" description="区域数据总览、本区域基地、报名、订单、投诉、退款、企业线索、加盟初审、排行榜和容量预警。" />
      <MetricsGrid data={data} />
      <div className="mt-6">
        <OperatorTables data={data} />
      </div>
    </div>
  );
}
