import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currency, formatDate } from "@/lib/format";
import type { CampPackageView } from "@/lib/types";

export function PackageCard({ pack }: { pack: CampPackageView }) {
  const nextSession = pack.sessions[0];
  return (
    <Card className="flex h-full flex-col gap-4">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge tone="blue">{pack.licenseType}</Badge>
          {pack.includesAccommodation ? <Badge tone="green">含住宿</Badge> : null}
          {pack.includesMeals ? <Badge tone="green">含餐</Badge> : null}
          {pack.supportsPickup ? <Badge tone="slate">接站</Badge> : null}
        </div>
        <h3 className="text-lg font-bold text-slate-950">{pack.name}</h3>
        <p className="mt-2 text-sm text-slate-500">{pack.baseName}</p>
      </div>
      <p className="line-clamp-3 text-sm leading-6 text-slate-600">{pack.description}</p>
      <div className="grid gap-2 text-sm text-slate-600">
        <div>适合人群：{pack.targetUsers}</div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-blue-600" />
          开班：{nextSession ? formatDate(nextSession.startDate) : "待公布"}
        </div>
        <div>剩余名额：{pack.remainingSeats}</div>
      </div>
      <div className="mt-auto rounded-md bg-slate-50 p-4">
        <div className="text-2xl font-bold text-slate-950">{currency(pack.price)}</div>
        <div className="mt-1 text-xs text-slate-500">{pack.durationText}</div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <LinkButton href={`/packages/${pack.slug}`} variant="outline">
          查看详情
        </LinkButton>
        <LinkButton href={`/apply?packageId=${pack.id}`} icon={<ArrowRight className="h-4 w-4" />}>
          立即报名
        </LinkButton>
      </div>
    </Card>
  );
}
