import Link from "next/link";
import { COMPLIANCE_NOTICE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid gap-6 py-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="text-lg font-bold text-slate-950">全国驾培集训平台</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{COMPLIANCE_NOTICE}</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <Link href="/rules">平台规则</Link>
          <Link href="/privacy">隐私政策</Link>
          <Link href="/orders">订单中心</Link>
        </div>
        <div className="grid gap-2 text-sm text-slate-600">
          <Link href="/merchant">基地后台</Link>
          <Link href="/operator">区域运营</Link>
          <Link href="/admin">平台后台</Link>
        </div>
      </div>
    </footer>
  );
}
