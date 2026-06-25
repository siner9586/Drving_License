import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { DataTable } from "@/components/ui/table";
import { getMockDataset } from "@/lib/mock-data";
import { currency } from "@/lib/format";

export default function DormitoriesPage() {
  const { dormitories } = getMockDataset();
  return (
    <div className="container-page py-8">
      <SectionHeader title="宿舍展示" description="展示 2 人间、4 人间、6 人间、空调、独卫、热水、洗衣机、男女分区、门禁和班主任管理等信息。" />
      <div className="grid gap-4 lg:grid-cols-2">
        {dormitories.map((dormitory) => (
          <Card key={dormitory.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-slate-500">{dormitory.baseName}</div>
                <h2 className="mt-1 text-xl font-bold text-slate-950">{dormitory.name}</h2>
              </div>
              <Badge tone="green">剩余 {dormitory.availableBeds} 床</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                dormitory.hasAirConditioning && "空调",
                dormitory.hasPrivateBathroom && "独卫",
                dormitory.hasHotWater && "热水",
                dormitory.hasLaundry && "洗衣机",
                dormitory.genderSeparated && "男女分区",
                dormitory.hasAccessControl && "门禁",
                dormitory.managerOnDuty && "班主任管理"
              ]
                .filter(Boolean)
                .map((item) => (
                  <Badge key={String(item)} tone="blue">
                    {item}
                  </Badge>
                ))}
            </div>
            <DataTable
              className="mt-4"
              columns={["房型", "容量", "总房间", "可用", "价格"]}
              rows={dormitory.rooms.map((room) => [
                room.roomType,
                `${room.capacity} 人`,
                room.totalRooms,
                room.availableRooms,
                currency(room.pricePerDay)
              ])}
            />
            <p className="mt-4 text-sm leading-6 text-slate-600">
              入住时间以订单报到确认单为准。{dormitory.rules} 安全提示：遵守门禁、消防和宿舍管理制度。
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
