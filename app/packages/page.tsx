import { PackageCard } from "@/components/package/package-card";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { LICENSE_TYPES } from "@/lib/constants";
import { listPackages } from "@/lib/data";

export default async function PackagesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const filters = await searchParams;
  const packages = await listPackages({ licenseType: filters.licenseType });
  return (
    <div className="container-page py-8">
      <SectionHeader
        eyebrow="班型服务"
        title="集训班型与增值服务"
        description="展示 C1、C2、学生假期、上班族、女生住宿、摩托车、转学续考、企业团训、新手陪练、周末强化、考前模拟和防御性驾驶等班型。"
      />
      <Card className="mb-6">
        <form className="grid gap-3 md:grid-cols-4">
          <select name="licenseType" defaultValue={filters.licenseType || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">全部车型</option>
            {LICENSE_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select name="accommodation" className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>住宿不限</option>
            <option>含住宿</option>
          </select>
          <select name="meal" className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option>餐饮不限</option>
            <option>含餐</option>
          </select>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">筛选班型</button>
        </form>
      </Card>
      <div className="grid gap-4 lg:grid-cols-3">
        {packages.map((pack) => (
          <PackageCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}
