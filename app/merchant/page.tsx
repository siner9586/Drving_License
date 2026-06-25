import { MerchantTables, MetricsGrid } from "@/components/admin/dashboard-panels";
import { SectionHeader } from "@/components/ui/section";
import { getDashboard } from "@/lib/data";

export default async function MerchantPage() {
  const data = await getDashboard("merchant");
  return (
    <div className="container-page py-8">
      <SectionHeader title="基地后台" description="基地概览、容量管理、班型管理、宿舍管理、食堂管理、学员名单和进度管理。" />
      <MetricsGrid data={data} />
      <div className="mt-6">
        <MerchantTables data={data} />
      </div>
    </div>
  );
}
