import Link from "next/link";
import { GraduationCap, LayoutDashboard } from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import { LinkButton } from "@/components/ui/button";

const navItems = [
  ["基地", "/bases"],
  ["班型", "/packages"],
  ["宿舍", "/dormitories"],
  ["食堂", "/canteens"],
  ["企业团训", "/enterprise"],
  ["加盟审核", "/franchise"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-950">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">{APP_NAME}</span>
          <span className="sm:hidden">驾培集训</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-blue-700">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LinkButton href="/apply" className="hidden sm:inline-flex">
            立即报名
          </LinkButton>
          <LinkButton href="/admin" variant="outline" icon={<LayoutDashboard className="h-4 w-4" />}>
            后台
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
