import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";

const sections = [
  ["收集哪些信息", "报名信息、联系方式、所在城市、目标车型、食宿需求、订单、报到、进度、投诉退款和评价信息。"],
  ["为什么收集", "用于基地确认、订单履约、住宿餐饮安排、接站、训练进度跟踪、售后保障和风控合规。"],
  ["如何使用", "仅在完成平台服务和必要管理时使用，敏感信息按角色权限隔离。"],
  ["如何保存", "生产环境使用 PostgreSQL 存储，保留审计日志和必要订单记录，按业务和法规要求控制保留期限。"],
  ["如何保护", "通过环境变量、数据库权限、后台角色权限、日志审计和最小化展示保护数据。"],
  ["如何删除", "用户可联系客服申请删除非必要信息，订单和合规留痕按规则处理。"],
  ["如何联系客服", "MVP 阶段预留在线工单、订单详情页和客服热线入口。"],
  ["敏感信息最小化", "身份证、手机号等敏感信息不公开展示，后台默认展示脱敏信息。"],
  ["后台权限隔离", "学员、基地商户、区域运营和平台管理员使用不同权限集合。"],
  ["日志审计说明", "后台关键操作预留 AuditLog 模型，记录操作者、动作、目标和时间。"]
];

export default function PrivacyPage() {
  return (
    <div className="container-page py-8">
      <SectionHeader title="隐私政策" description="平台不公开展示身份证、手机号等敏感信息，后续生产接入需完善认证、脱敏和数据删除流程。" />
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(([title, content]) => (
          <Card key={title}>
            <h2 className="text-lg font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{content}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
