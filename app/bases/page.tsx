import { Filter } from "lucide-react";
import { BaseCard } from "@/components/base/base-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { LICENSE_TYPES, PROVINCE_CITY_PAIRS } from "@/lib/constants";
import { listBases } from "@/lib/data";

export default async function BasesPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const filters = await searchParams;
  const bases = await listBases(filters);
  const provinces = Array.from(new Set(PROVINCE_CITY_PAIRS.map(([province]) => province)));

  return (
    <div className="container-page py-8">
      <SectionHeader
        eyebrow="全国基地"
        title="平台认证集训基地"
        description="支持按省市、车型、食宿、接站、女生宿舍、企业团训、价格区间、容量状态、基地等级和认证状态筛选。"
      />
      <Card className="mb-6">
        <form className="grid gap-3 md:grid-cols-4 lg:grid-cols-6">
          <select name="province" defaultValue={filters.province || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">省份</option>
            {provinces.map((province) => (
              <option key={province}>{province}</option>
            ))}
          </select>
          <input name="city" defaultValue={filters.city || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="城市" />
          <select name="licenseType" defaultValue={filters.licenseType || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">车型</option>
            {LICENSE_TYPES.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <select name="level" defaultValue={filters.level || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">基地等级</option>
            {["A", "B", "C"].map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
          <select name="accommodation" defaultValue={filters.accommodation || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">是否含住宿</option>
            <option value="true">含住宿</option>
          </select>
          <select name="meals" defaultValue={filters.meals || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">是否含餐</option>
            <option value="true">含餐</option>
          </select>
          <select name="pickup" defaultValue={filters.pickup || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">是否接站</option>
            <option value="true">支持接站</option>
          </select>
          <select name="femaleDorm" defaultValue={filters.femaleDorm || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">女生宿舍</option>
            <option value="true">支持女生宿舍</option>
          </select>
          <select name="enterprise" defaultValue={filters.enterprise || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">企业团训</option>
            <option value="true">支持企业团训</option>
          </select>
          <select name="verified" defaultValue={filters.verified || ""} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">认证状态</option>
            <option value="true">平台认证</option>
          </select>
          <select name="capacity" className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <option value="">容量状态</option>
            <option>余量充足</option>
            <option>余量紧张</option>
          </select>
          <button className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            <Filter className="h-4 w-4" />
            筛选
          </button>
        </form>
      </Card>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">共找到 {bases.length} 个演示基地</div>
        <Badge tone="green">平台认证展示</Badge>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {bases.map((base) => (
          <BaseCard key={base.id} base={base} />
        ))}
      </div>
    </div>
  );
}
