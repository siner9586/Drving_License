import { ArrowRight, Building2, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currency, percent } from "@/lib/format";
import type { TrainingBaseView } from "@/lib/types";

export function BaseCard({ base }: { base: TrainingBaseView }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {base.province} {base.city}
          </div>
          <h3 className="mt-2 text-lg font-bold text-slate-950">{base.name}</h3>
        </div>
        <Badge tone={base.level === "A" ? "green" : "blue"}>{base.level} 级基地</Badge>
      </div>
      <p className="line-clamp-2 text-sm leading-6 text-slate-600">{base.summary}</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <Info label="训练场" value={`${base.trainingFieldArea.toLocaleString()} 平方米`} />
        <Info label="教练/车辆" value={`${base.coachCount} / ${base.vehicleCount}`} />
        <Info label="剩余床位" value={`${base.availableBeds}/${base.totalBeds}`} />
        <Info label="日供餐" value={`${base.canteenCapacity} 人`} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge tone="green">平台认证</Badge>
        {base.supportsAccommodation ? <Badge tone="blue">含住宿</Badge> : null}
        {base.supportsMeals ? <Badge tone="blue">含餐</Badge> : null}
        {base.supportsPickup ? <Badge tone="slate">接站</Badge> : null}
        {base.supportsEnterpriseTraining ? <Badge tone="amber">企业团训</Badge> : null}
      </div>
      <div className="mt-auto grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
        <div className="text-sm text-slate-600">
          <div className="flex items-center gap-1 font-semibold text-slate-950">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            {base.rating}
          </div>
          投诉率 {percent(base.complaintRate)}
        </div>
        <div className="text-sm text-slate-600">
          <div className="font-semibold text-slate-950">
            {currency(base.priceMin)} - {currency(base.priceMax)}
          </div>
          班型价格区间
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <LinkButton href={`/bases/${base.slug}`} variant="outline" icon={<Building2 className="h-4 w-4" />}>
          查看详情
        </LinkButton>
        <LinkButton href={`/apply?baseId=${base.id}`} icon={<ArrowRight className="h-4 w-4" />}>
          立即报名
        </LinkButton>
      </div>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 font-semibold text-slate-900">{value}</div>
    </div>
  );
}
