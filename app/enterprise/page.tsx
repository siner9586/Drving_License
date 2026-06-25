import { Field, inputClass, SubmitForm } from "@/components/ui/forms";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { LICENSE_TYPES, PROVINCE_CITY_PAIRS } from "@/lib/constants";

export default function EnterprisePage() {
  const provinces = Array.from(new Set(PROVINCE_CITY_PAIRS.map(([province]) => province)));
  const services = ["企业司机安全培训", "批量 C1/C2 培训", "物流/运输企业培训", "防御性驾驶培训", "新司机上岗训练", "年度复训", "集中住宿餐饮能力", "企业专属排班"];
  return (
    <div className="container-page py-8">
      <SectionHeader title="企业司机团训" description="面向物流、运输、通勤车队和企业司机管理场景，提供集中排班、食宿支持和企业培训进度报表。" />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="flex flex-wrap gap-2">
            {services.map((service) => <Badge key={service} tone="blue">{service}</Badge>)}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            企业团训服务以培训、住宿、餐饮、接站、进度报表和售后协同为核心，支持企业专属排班和分批报到。
          </p>
        </Card>
        <Card>
          <h2 className="text-2xl font-bold text-slate-950">企业线索表单</h2>
          <SubmitForm action="/api/enterprise" buttonText="提交企业线索" successMessage="企业团训线索已提交">
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="企业名称"><input name="companyName" required className={inputClass} /></Field>
              <Field label="联系人"><input name="contactName" required className={inputClass} /></Field>
              <Field label="手机号"><input name="phone" required className={inputClass} /></Field>
              <Field label="所在省份"><select name="province" className={inputClass}>{provinces.map((province) => <option key={province}>{province}</option>)}</select></Field>
              <Field label="所在城市"><input name="city" required className={inputClass} /></Field>
              <Field label="培训人数"><input name="studentCount" type="number" min="1" required className={inputClass} /></Field>
              <Field label="目标车型"><select name="targetLicenseType" className={inputClass}>{LICENSE_TYPES.map((type) => <option key={type}>{type}</option>)}</select></Field>
              <Field label="期望培训时间"><input name="expectedTrainingDate" type="date" className={inputClass} /></Field>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <label className="flex items-center gap-2 text-sm"><input name="needAccommodation" type="checkbox" value="true" /> 需要住宿</label>
              <label className="flex items-center gap-2 text-sm"><input name="needMeals" type="checkbox" value="true" /> 需要餐饮</label>
            </div>
            <div className="mt-4"><Field label="备注"><textarea name="note" className={`${inputClass} min-h-24`} /></Field></div>
          </SubmitForm>
        </Card>
      </div>
    </div>
  );
}
