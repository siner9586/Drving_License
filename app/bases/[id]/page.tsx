import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CalendarDays, Heart, MessageCircle, ShieldCheck, UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card, StatCard } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { COMPLIANCE_NOTICE } from "@/lib/constants";
import { getBaseById, listPackages } from "@/lib/data";
import { currency, formatDate, percent } from "@/lib/format";

export default async function BaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const base = await getBaseById(id);
  if (!base) notFound();
  const packages = (await listPackages({ baseId: base.id })).slice(0, 6);
  const dorm = base.dormitories[0];
  const canteen = base.canteens[0];

  return (
    <div className="bg-slate-50">
      <section className="bg-white">
        <div className="container-page grid gap-6 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Image src={base.coverImage} alt={base.name} width={1400} height={900} priority className="h-80 w-full rounded-lg object-cover lg:h-[460px]" />
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge tone="green">平台认证</Badge>
              <Badge tone="blue">{base.level} 级基地</Badge>
              <Badge tone="slate">{base.province} {base.city}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">{base.name}</h1>
            <p className="mt-4 text-base leading-8 text-slate-600">{base.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <StatCard label="训练场面积" value={`${base.trainingFieldArea.toLocaleString()}㎡`} />
              <StatCard label="教练/车辆" value={`${base.coachCount}/${base.vehicleCount}`} />
              <StatCard label="剩余床位" value={`${base.availableBeds}`} />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href={`/apply?baseId=${base.id}`} icon={<ArrowRight className="h-4 w-4" />}>
                立即报名
              </LinkButton>
              <LinkButton href="/enterprise" variant="outline" icon={<UsersRound className="h-4 w-4" />}>
                企业团训咨询
              </LinkButton>
              <LinkButton href="/orders" variant="outline" icon={<Heart className="h-4 w-4" />}>
                收藏或咨询
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-6 py-8 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <Card>
            <h2 className="text-2xl font-bold text-slate-950">基地资质与接待能力</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Info title="可接收全国学员" text="支持异地学员报到、住宿、餐饮和训练进度跟踪，报到材料以基地确认清单为准。" />
              <Info title="驾校资质摘要" text="展示营业执照、驾培备案、训练场、教练和车辆等审核摘要，后续真实资质文件接入上传与审核流。" />
              <Info title="训练场介绍" text={`演示训练场面积 ${base.trainingFieldArea.toLocaleString()} 平方米，含场地训练、道路训练衔接和安全巡检制度。`} />
              <Info title="车辆规模" text={`教练车 ${base.vehicleCount} 台，支持 ${base.vehicles.map((item) => item.vehicleType).slice(0, 4).join("、")} 等训练车型。`} />
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">教练团队与可培训车型</h2>
            <DataTable
              columns={["教练", "年限", "车型", "标签", "评分"]}
              rows={base.coaches.map((coach) => [coach.name, `${coach.years} 年`, coach.licenseTypes.join(" / "), coach.tags.join("、"), coach.rating])}
            />
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">宿舍条件与食堂条件</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Info title={dorm?.name || "宿舍"} text={`${dorm?.totalBeds || 0} 张床位，剩余 ${dorm?.availableBeds || 0}，空调、热水、洗衣、门禁、男女分区和班主任管理。`} />
              <Info title={canteen?.name || "食堂"} text={`每日 ${canteen?.mealCountPerDay || 3} 餐，日供餐能力 ${canteen?.dailyCapacity || 0} 人，支持素食和企业团餐。`} />
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">接站服务与开班计划</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {base.supportsPickup ? "支持按订单预约接站，站点和时间以基地确认单为准。" : "该基地当前暂不展示接站服务。"}
            </p>
            <DataTable
              className="mt-4"
              columns={["班型", "开班日期", "结束日期", "容量", "剩余名额", "状态"]}
              rows={packages.flatMap((pack) =>
                pack.sessions.map((session) => [
                  pack.name,
                  formatDate(session.startDate),
                  formatDate(session.endDate),
                  session.capacity,
                  session.remainingSeats,
                  session.status
                ])
              )}
            />
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">热门班型</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {packages.map((pack) => (
                <div key={pack.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="font-bold text-slate-950">{pack.name}</div>
                  <div className="mt-2 text-sm text-slate-600">{pack.targetUsers}</div>
                  <div className="mt-3 text-xl font-bold text-blue-700">{currency(pack.price)}</div>
                  <LinkButton href={`/packages/${pack.slug}`} variant="outline" className="mt-3 w-full">
                    查看班型
                  </LinkButton>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">容量日历</h2>
            <DataTable
              className="mt-4"
              columns={["日期", "可接收新学员", "可用床位", "可用车辆", "可用教练", "预警"]}
              rows={base.capacityCalendar.slice(0, 10).map((day) => [
                formatDate(day.date),
                day.newStudentCapacity,
                day.availableBeds,
                day.availableVehicles,
                day.availableCoaches,
                day.warningLevel
              ])}
            />
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">报名流程与报到须知</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-5">
              {["选择基地班型", "提交报名资料", "基地确认容量", "到校报到入住", "训练进度跟踪"].map((item, index) => (
                <div key={item} className="rounded-md bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                  {index + 1}. {item}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              报到需携带身份证明材料、体检相关材料和订单确认信息。具体资料、体检、考试预约和考试结果以当地交管部门规则为准。
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">费用明细与退款规则</h2>
            <DataTable
              className="mt-4"
              columns={["费用项", "说明", "是否包含", "退款口径"]}
              rows={[
                ["培训费", "教练训练、排班、进度跟踪", "按班型", "未发生部分按规则核算"],
                ["住宿费", "基础床位或升级房型", "按班型", "按实际入住扣除"],
                ["餐饮费", "基础餐标或升级餐标", "按班型", "按实际用餐扣除"],
                ["体检费", "按当地规则", "通常不含", "由实际收取方规则决定"],
                ["考试规费", "按当地规则", "不含", "由实际收取方规则决定"],
                ["模拟费", "按学员选择", "不含", "未使用可按规则核算"],
                ["补考费", "按实际发生", "不含", "已发生不可退"],
                ["接站费", "预约接站服务", "按班型", "未执行可退"],
                ["保险/保障费", "平台服务保障", "按订单", "按规则核算"],
                ["其他可能费用", "个人用品、升级服务", "不含", "按实际选择核算"]
              ]}
            />
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-slate-950">学员评价、投诉与保障</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {base.reviews.map((review) => (
                <div key={review.id} className="rounded-lg border border-slate-200 p-4">
                  <div className="font-semibold text-slate-950">{review.studentName}</div>
                  <div className="mt-1 text-amber-500">{"★".repeat(review.rating)}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{review.content}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              投诉、退款和评价入口在订单中心统一管理，平台保留服务记录、沟通记录和仲裁流程。
            </p>
          </Card>
        </div>

        <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
          <Card>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              安全与合规
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{COMPLIANCE_NOTICE} 不承诺包过、免考、代考或买卖驾驶证。</p>
          </Card>
          <Card>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
              <CalendarDays className="h-4 w-4" />
              容量状态
            </div>
            <div className="mt-3 grid gap-2 text-sm text-slate-600">
              <div>当前床位余量：{base.availableBeds}</div>
              <div>投诉率：{percent(base.complaintRate)}</div>
              <div>退款率：{percent(base.refundRate)}</div>
            </div>
          </Card>
          <LinkButton href={`/apply?baseId=${base.id}`} className="w-full" icon={<ArrowRight className="h-4 w-4" />}>
            立即报名
          </LinkButton>
          <LinkButton href="/enterprise" className="w-full" variant="outline" icon={<MessageCircle className="h-4 w-4" />}>
            咨询企业团训
          </LinkButton>
        </aside>
      </div>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
