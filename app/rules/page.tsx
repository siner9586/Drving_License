import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { DataTable } from "@/components/ui/table";
import { FORBIDDEN_KEYWORDS } from "@/lib/risk";

const sections = [
  ["用户服务协议", "用户需提供真实报名信息，遵守平台规则、基地管理制度和当地交管部门相关要求。"],
  ["平台交易规则", "平台展示培训、住宿、餐饮、接站和服务保障项目，订单费用需分项展示并留痕。"],
  ["报名规则", "学员选择基地与班型后提交申请，基地确认容量、班次和资料要求后进入订单流程。"],
  ["退款规则", "未发生服务按规则核算退款，已发生的培训、住宿、餐饮、接站等服务据实扣除。"],
  ["投诉仲裁规则", "投诉进入平台工单，基地限时响应，平台可调取订单、沟通和服务记录进行仲裁。"],
  ["评价规则", "评价应基于真实服务体验，不得泄露他人隐私或发布违法违规信息。"],
  ["禁售禁发规则", `平台禁止发布或暗示以下内容：${FORBIDDEN_KEYWORDS.join("、")}。`],
  ["加盟基地审核规则", "加盟驾校需通过主体资质、驾培备案、训练场、教练、车辆、食宿、安全、收费、合同、退款和试运营审核。"],
  ["食宿安全说明", "宿舍需具备门禁、消防、管理人员和退宿规则；食堂需具备留样、台账、食安投诉渠道。"],
  ["合规声明", "平台仅提供培训、住宿、餐饮、报到、进度跟踪和售后保障服务；考试预约及结果以当地交管部门规则为准。"]
];

export default function RulesPage() {
  return (
    <div className="container-page py-8">
      <SectionHeader title="平台规则" description="MVP 版本规则用于产品演示和后续法务、运营、商户审核流程扩展。" />
      <Card>
        <DataTable columns={["规则", "要点"]} rows={sections} />
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
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
