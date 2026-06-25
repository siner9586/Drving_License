import { Field, inputClass, SubmitForm } from "@/components/ui/forms";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { PROVINCE_CITY_PAIRS } from "@/lib/constants";

export default function FranchisePage() {
  const provinces = Array.from(new Set(PROVINCE_CITY_PAIRS.map(([province]) => province)));
  return (
    <div className="container-page py-8">
      <SectionHeader
        title="加盟驾校审核申请"
        description="后续加盟驾校实行严格审核制，需通过主体资质、备案、训练场、教练、车辆、宿舍、食堂、消防安全、食品安全、收费、合同、退款和试运营审核。"
      />
      <div className="mb-6 flex flex-wrap gap-2">
        {["主体资质", "驾培备案", "训练场", "教练车辆", "宿舍食堂", "消防安全", "食品安全", "价格透明", "合同退款", "试运营"].map((item) => (
          <Badge key={item} tone="blue">{item}</Badge>
        ))}
      </div>
      <Card>
        <SubmitForm action="/api/franchise" buttonText="提交审核" successMessage="加盟审核申请已提交">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="驾校名称"><input name="schoolName" required className={inputClass} /></Field>
            <Field label="所在省份"><select name="province" className={inputClass}>{provinces.map((province) => <option key={province}>{province}</option>)}</select></Field>
            <Field label="所在城市"><input name="city" required className={inputClass} /></Field>
            <Field label="营业执照编号"><input name="licenseNo" required className={inputClass} /></Field>
            <Field label="驾培备案信息"><input name="filingNo" required className={inputClass} /></Field>
            <Field label="训练场地址"><input name="trainingFieldAddress" required className={inputClass} /></Field>
            <Field label="训练场面积"><input name="trainingFieldArea" type="number" required className={inputClass} /></Field>
            <Field label="教练数量"><input name="coachCount" type="number" required className={inputClass} /></Field>
            <Field label="教练车数量"><input name="vehicleCount" type="number" required className={inputClass} /></Field>
            <Field label="可培训车型"><input name="licenseTypes" required placeholder="C1,C2,D" className={inputClass} /></Field>
            <Field label="宿舍床位数"><input name="bedCount" type="number" required className={inputClass} /></Field>
            <Field label="日供餐能力"><input name="canteenCapacity" type="number" required className={inputClass} /></Field>
            <Field label="联系人"><input name="contactName" required className={inputClass} /></Field>
            <Field label="联系方式"><input name="contactPhone" required className={inputClass} /></Field>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            <label className="flex items-center gap-2 text-sm"><input name="hasDormitory" type="checkbox" value="true" /> 有宿舍</label>
            <label className="flex items-center gap-2 text-sm"><input name="hasCanteen" type="checkbox" value="true" /> 有食堂</label>
            <label className="flex items-center gap-2 text-sm"><input name="supportsPickup" type="checkbox" value="true" /> 支持接站</label>
            <label className="flex items-center gap-2 text-sm"><input name="supportsFemaleDorm" type="checkbox" value="true" /> 女性宿舍</label>
            <label className="flex items-center gap-2 text-sm"><input name="canServeNationalStudents" type="checkbox" value="true" /> 全国学员</label>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="消防/安全管理说明"><textarea name="safetyDescription" required className={`${inputClass} min-h-24`} /></Field>
            <Field label="食品安全说明"><textarea name="foodSafetyDescription" required className={`${inputClass} min-h-24`} /></Field>
            <Field label="收费标准"><textarea name="priceDescription" required className={`${inputClass} min-h-24`} /></Field>
            <Field label="合同与退款规则"><textarea name="contractDescription" required className={`${inputClass} min-h-24`} /></Field>
            <Field label="退款说明"><textarea name="refundDescription" required className={`${inputClass} min-h-24`} /></Field>
            <Field label="上传资质文件预留位"><input disabled value="MVP 阶段预留上传入口" className={inputClass} /></Field>
          </div>
        </SubmitForm>
      </Card>
    </div>
  );
}
