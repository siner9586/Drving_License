import { SubmitForm, Field, inputClass } from "@/components/ui/forms";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section";
import { COMPLIANCE_CONFIRMATION, LICENSE_TYPES, PROVINCE_CITY_PAIRS } from "@/lib/constants";
import { listBases, listPackages } from "@/lib/data";

export default async function ApplyPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const [bases, packages] = await Promise.all([listBases(), listPackages()]);
  const provinces = Array.from(new Set(PROVINCE_CITY_PAIRS.map(([province]) => province)));
  return (
    <div className="container-page py-8">
      <SectionHeader
        eyebrow="学员报名"
        title="提交集训报名申请"
        description="提交后创建报名申请。数据库可用时写入 Application，无数据库时返回演示申请编号。"
      />
      <Card>
        <SubmitForm action="/api/applications" buttonText="提交报名" successMessage="报名申请已提交">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="姓名"><input name="studentName" required className={inputClass} /></Field>
            <Field label="手机号"><input name="phone" required className={inputClass} /></Field>
            <Field label="当前所在省份">
              <select name="province" required className={inputClass}>
                {provinces.map((province) => <option key={province}>{province}</option>)}
              </select>
            </Field>
            <Field label="当前所在城市"><input name="city" required className={inputClass} /></Field>
            <Field label="目标车型">
              <select name="targetLicenseType" required className={inputClass}>{LICENSE_TYPES.map((type) => <option key={type}>{type}</option>)}</select>
            </Field>
            <Field label="期望基地">
              <select name="baseId" defaultValue={params.baseId || ""} className={inputClass}>
                <option value="">待平台推荐</option>
                {bases.map((base) => <option key={base.id} value={base.id}>{base.name}</option>)}
              </select>
            </Field>
            <Field label="期望班型">
              <select name="packageId" defaultValue={params.packageId || ""} className={inputClass}>
                <option value="">待平台推荐</option>
                {packages.map((pack) => <option key={pack.id} value={pack.id}>{pack.name} · {pack.baseName}</option>)}
              </select>
            </Field>
            <Field label="预计到校日期"><input name="expectedArrivalDate" type="date" className={inputClass} /></Field>
            <Field label="企业名称（如企业团训）"><input name="enterpriseName" className={inputClass} /></Field>
            <Field label="企业团训人数"><input name="enterpriseSize" type="number" min="1" className={inputClass} /></Field>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <label className="flex items-center gap-2 text-sm"><input name="needAccommodation" type="checkbox" value="true" /> 需要住宿</label>
            <label className="flex items-center gap-2 text-sm"><input name="needMeals" type="checkbox" value="true" /> 需要餐饮</label>
            <label className="flex items-center gap-2 text-sm"><input name="needPickup" type="checkbox" value="true" /> 需要接站</label>
            <label className="flex items-center gap-2 text-sm"><input name="isEnterprise" type="checkbox" value="true" /> 企业团训</label>
          </div>
          <div className="mt-4">
            <Field label="备注"><textarea name="note" className={`${inputClass} min-h-28`} /></Field>
          </div>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <label className="flex gap-2"><input required name="agreeRules" type="checkbox" value="true" /> 同意用户协议</label>
            <label className="flex gap-2"><input required name="agreePrivacy" type="checkbox" value="true" /> 同意隐私政策</label>
            <label className="flex gap-2">
              <input required name="complianceConfirmation" type="checkbox" value={COMPLIANCE_CONFIRMATION} />
              <span>{COMPLIANCE_CONFIRMATION}</span>
            </label>
          </div>
        </SubmitForm>
      </Card>
    </div>
  );
}
