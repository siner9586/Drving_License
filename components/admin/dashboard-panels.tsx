import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card, StatCard } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table";
import { ORDER_STATUS_LABEL, RISK_SOURCE_LABEL } from "@/lib/constants";
import { currency, percent } from "@/lib/format";
import type { DashboardData } from "@/lib/types";

export function MetricsGrid({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
      {data.metrics.map((metric) => (
        <StatCard key={metric.label} label={metric.label} value={metric.value} helper={metric.helper} />
      ))}
    </div>
  );
}

export function PlatformAdminTables({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6">
      <Card>
        <h2 className="text-xl font-bold text-slate-950">全国基地管理</h2>
        <DataTable
          className="mt-4"
          columns={["基地名称", "省市", "等级", "认证状态", "教练", "车辆", "总床位", "剩余床位", "食堂容量", "当前订单", "投诉率", "状态", "操作"]}
          rows={data.bases.slice(0, 10).map((base) => [
            base.name,
            `${base.province}${base.city}`,
            base.level,
            base.verified ? <Badge key="verified" tone="green">已认证</Badge> : <Badge key="pending">待认证</Badge>,
            base.coachCount,
            base.vehicleCount,
            base.totalBeds,
            base.availableBeds,
            base.canteenCapacity,
            data.orders.filter((order) => order.baseId === base.id).length,
            percent(base.complaintRate),
            base.status,
            <LinkButton key="action" href={`/bases/${base.slug}`} variant="outline">查看</LinkButton>
          ])}
        />
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-slate-950">加盟申请审核</h2>
        <DataTable
          className="mt-4"
          columns={["申请驾校", "省市", "资质状态", "宿舍能力", "食堂能力", "全国学员", "审核状态", "风险提示", "操作"]}
          rows={data.franchiseApplications.slice(0, 10).map((item) => [
            item.schoolName,
            `${item.province}${item.city}`,
            item.licenseNo ? "已填报" : "缺失",
            item.hasDormitory ? `${item.bedCount} 床` : "无",
            item.hasCanteen ? `${item.canteenCapacity} 人/日` : "无",
            item.canServeNationalStudents ? "支持" : "待确认",
            item.status,
            item.riskFlag ? <Badge key="risk" tone="red">需复核</Badge> : <Badge key="normal" tone="green">正常</Badge>,
            <div key="actions" className="flex gap-2">
              <button className="rounded-md border border-slate-200 px-3 py-1 text-xs">初审</button>
              <button className="rounded-md border border-slate-200 px-3 py-1 text-xs">补资料</button>
              <button className="rounded-md border border-slate-200 px-3 py-1 text-xs">试运营</button>
              <button className="rounded-md bg-emerald-600 px-3 py-1 text-xs text-white">通过</button>
              <button className="rounded-md bg-rose-600 px-3 py-1 text-xs text-white">驳回</button>
            </div>
          ])}
        />
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-slate-950">订单管理</h2>
        <DataTable
          className="mt-4"
          columns={["订单号", "学员", "基地", "班型", "金额", "状态", "支付状态", "报到状态", "操作"]}
          rows={data.orders.slice(0, 12).map((order) => [
            order.orderNo,
            order.studentName,
            order.baseName,
            order.packageName,
            currency(order.totalAmount),
            ORDER_STATUS_LABEL[order.status],
            order.paymentStatus,
            order.checkinStatus,
            <button key="update" className="rounded-md border border-slate-200 px-3 py-1 text-xs">更新状态</button>
          ])}
        />
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">投诉仲裁</h2>
          <DataTable
            className="mt-4"
            columns={["投诉编号", "学员", "基地", "类型", "严重程度", "状态", "处理建议", "操作"]}
            rows={data.complaints.map((item) => [item.id, item.studentName, item.baseName, item.type, item.severity, item.status, item.resolution, "进入工单"])}
          />
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">退款管理</h2>
          <DataTable
            className="mt-4"
            columns={["退款编号", "订单号", "学员", "原因", "申请金额", "可退金额", "状态", "操作"]}
            rows={data.refunds.map((item) => [item.id, item.orderNo, item.studentName, item.reason, currency(item.requestedAmount), currency(item.approvedAmount), item.status, "审核"])}
          />
        </Card>
      </div>
      <Card>
        <h2 className="text-xl font-bold text-slate-950">风控事件</h2>
        <DataTable
          className="mt-4"
          columns={["事件编号", "触发位置", "命中词", "内容摘要", "用户/商户", "风险等级", "状态"]}
          rows={data.riskEvents.map((item) => [item.id, RISK_SOURCE_LABEL[item.sourceType] || item.sourceType, item.keyword, item.contentSnippet, item.sourceId, item.riskLevel, item.status])}
        />
      </Card>
      <Card>
        <h2 className="text-xl font-bold text-slate-950">平台规则管理</h2>
        <DataTable
          className="mt-4"
          columns={["规则类型", "标题", "版本", "发布", "更新时间"]}
          rows={data.rules.map((rule) => [rule.type, rule.title, rule.version, rule.published ? "已发布" : "草稿", rule.updatedAt.slice(0, 10)])}
        />
      </Card>
    </div>
  );
}

export function MerchantTables({ data }: { data: DashboardData }) {
  const base = data.bases[0];
  return (
    <div className="grid gap-6">
      <Card>
        <h2 className="text-xl font-bold text-slate-950">容量管理</h2>
        <DataTable
          className="mt-4"
          columns={["日期", "每日可接收", "床位余量", "教练容量", "车辆容量", "满员预警"]}
          rows={base.capacityCalendar.slice(0, 10).map((day) => [day.date.slice(0, 10), day.newStudentCapacity, day.availableBeds, day.availableCoaches, day.availableVehicles, day.warningLevel])}
        />
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">班型管理</h2>
          <DataTable
            className="mt-4"
            columns={["班型", "车型", "价格", "住宿", "餐饮", "剩余名额", "状态"]}
            rows={data.orders.slice(0, 8).map((order) => [order.packageName, order.licenseType, currency(order.totalAmount), order.accommodation ? "是" : "否", order.meals ? "是" : "否", 18, "展示中"])}
          />
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">宿舍管理</h2>
          <DataTable
            className="mt-4"
            columns={["房型", "总床位", "已入住", "剩余", "卫浴", "空调", "男女分区", "价格"]}
            rows={base.dormitories[0].rooms.map((room) => [room.roomType, room.capacity * room.totalRooms, room.capacity * (room.totalRooms - room.availableRooms), room.capacity * room.availableRooms, room.features.includes("公共卫浴") ? "公共" : "独卫", "有", "有", currency(room.pricePerDay)])}
          />
        </Card>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">食堂管理</h2>
          <DataTable
            className="mt-4"
            columns={["餐标", "日供餐能力", "今日用餐", "特殊餐支持", "食安状态"]}
            rows={base.canteens[0].mealPlans.map((plan) => [plan.name, base.canteenCapacity, 96, base.canteens[0].supportsVegetarian ? "素食/备注餐" : "普通餐", "正常"])}
          />
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">学员名单与进度管理</h2>
          <DataTable
            className="mt-4"
            columns={["学员姓名", "手机尾号", "班型", "报到", "入住", "当前进度", "下一步"]}
            rows={data.orders.map((order) => [order.studentName, order.phoneTail, order.packageName, order.checkinStatus, order.accommodation ? "需住宿" : "不住宿", order.progressStatus, order.nextStep])}
          />
        </Card>
      </div>
    </div>
  );
}

export function OperatorTables({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6">
      <Card>
        <h2 className="text-xl font-bold text-slate-950">本区域基地与容量预警</h2>
        <DataTable
          className="mt-4"
          columns={["基地", "省市", "等级", "床位余量", "订单", "投诉率", "容量预警"]}
          rows={data.bases.map((base) => [base.name, `${base.province}${base.city}`, base.level, base.availableBeds, data.orders.filter((order) => order.baseId === base.id).length, percent(base.complaintRate), base.availableBeds < 50 ? "关注" : "正常"])}
        />
      </Card>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold text-slate-950">区域订单</h2>
          <DataTable
            className="mt-4"
            columns={["订单号", "学员", "基地", "金额", "状态"]}
            rows={data.orders.slice(0, 10).map((order) => [order.orderNo, order.studentName, order.baseName, currency(order.totalAmount), ORDER_STATUS_LABEL[order.status]])}
          />
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-slate-950">企业团训线索</h2>
          <DataTable
            className="mt-4"
            columns={["企业", "城市", "人数", "车型", "食宿", "状态"]}
            rows={data.enterpriseLeads.map((lead) => [lead.companyName, `${lead.province}${lead.city}`, lead.studentCount, lead.targetLicenseType, `${lead.needAccommodation ? "住" : "不住"}/${lead.needMeals ? "餐" : "不餐"}`, lead.status])}
          />
        </Card>
      </div>
      <Card>
        <h2 className="text-xl font-bold text-slate-950">区域排行榜</h2>
        <DataTable
          className="mt-4"
          columns={["排名", "基地", "评分", "订单", "可用床位", "投诉率"]}
          rows={data.bases.map((base, index) => [index + 1, base.name, base.rating, data.orders.filter((order) => order.baseId === base.id).length, base.availableBeds, percent(base.complaintRate)])}
        />
      </Card>
    </div>
  );
}
