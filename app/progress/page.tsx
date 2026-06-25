import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { DataTable } from "@/components/ui/table";
import { COMPLIANCE_NOTICE, PROGRESS_STAGE_LABEL } from "@/lib/constants";
import { getProgressList } from "@/lib/data";
import { formatDate } from "@/lib/format";

export default async function ProgressPage() {
  const progressList = await getProgressList();
  return (
    <div className="container-page py-8">
      <SectionHeader title="学员训练进度" description="展示报名资料审核、基地确认、到校报到、入住、理论学习、场地训练、道路训练和考试预约提示。" />
      <div className="grid gap-4">
        {progressList.slice(0, 12).map((progress) => (
          <Card key={progress.id}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm text-slate-500">{progress.orderNo} · {progress.baseName}</div>
                <h2 className="mt-1 text-xl font-bold text-slate-950">{progress.studentName} · {progress.packageName}</h2>
              </div>
              <Badge tone="blue">{PROGRESS_STAGE_LABEL[progress.currentStage]}</Badge>
            </div>
            <DataTable
              className="mt-4"
              columns={["报名资料审核", "基地确认", "到校报到", "入住状态", "理论学习", "场地训练", "道路训练", "考试预约提示"]}
              rows={[[
                "已记录",
                "已确认",
                progress.currentStage === "CHECKIN" ? "进行中" : "按计划",
                progress.currentStage === "STAY" ? "已入住" : "待确认",
                progress.theoryStatus,
                progress.fieldTrainingStatus,
                progress.roadTrainingStatus,
                progress.examBookingNote
              ]]}
            />
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <Info title="下一步事项" text={progress.nextStep} />
              <Info title="班主任备注" text={progress.teacherNote} />
              <Info title="基地备注" text={progress.managerNote} />
            </div>
            <p className="mt-4 text-xs text-slate-500">更新人：{progress.updatedBy} · {formatDate(progress.updatedAt)}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-6 border-blue-100 bg-blue-50">
        <p className="text-sm leading-6 text-blue-800">{COMPLIANCE_NOTICE} 平台不承诺考试结果。</p>
      </Card>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <div className="text-sm font-semibold text-slate-950">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{text}</div>
    </div>
  );
}
