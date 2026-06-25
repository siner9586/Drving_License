import { PlatformAdminTables, MetricsGrid } from "@/components/admin/dashboard-panels";
import { SectionHeader } from "@/components/ui/section";
import { getDashboard } from "@/lib/data";

export default async function AdminPage() {
  const data = await getDashboard("admin");
  return (
    <div className="container-page py-8">
      <SectionHeader title="平台后台" description="平台数据总览、全国基地管理、加盟申请审核、订单管理、投诉仲裁、退款管理、风控事件和规则管理。" />
      <MetricsGrid data={data} />
      <div className="mt-6">
        <PlatformAdminTables data={data} />
      </div>
    </div>
  );
}
