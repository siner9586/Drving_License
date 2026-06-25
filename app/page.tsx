import Image from "next/image";
import { ArrowRight, Building2, CheckCircle2, ShieldCheck, TrainFront, UsersRound } from "lucide-react";
import { BaseCard } from "@/components/base/base-card";
import { PackageCard } from "@/components/package/package-card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { Card, StatCard } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/ui/section";
import { COMPLIANCE_NOTICE, PROVINCE_CITY_PAIRS } from "@/lib/constants";
import { listBases, listPackages } from "@/lib/data";
import { getMockDataset } from "@/lib/mock-data";

export default async function HomePage() {
  const bases = await listBases();
  const packages = await listPackages();
  const data = getMockDataset();
  const provinces = new Set(PROVINCE_CITY_PAIRS.map(([province]) => province));
  const heroImage =
    bases[0]?.coverImage ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80";

  return (
    <>
      <section className="bg-white">
        <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
          <div className="flex flex-col justify-center">
            <Badge tone="green" className="w-fit">
              平台认证集训基地 · 食宿练一体化
            </Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-normal text-slate-950 md:text-6xl">
              全国驾培集训基地，吃住练一站式安排
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              平台以认证合作驾校为核心，集中展示具备宿舍、食堂、训练场和教练团队的集训基地，面向全国学员提供报名、报到、住宿、餐饮、训练进度和售后保障服务。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/bases" icon={<Building2 className="h-4 w-4" />}>
                查看集训基地
              </LinkButton>
              <LinkButton href="/enterprise" variant="outline" icon={<UsersRound className="h-4 w-4" />}>
                企业团训咨询
              </LinkButton>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="overflow-hidden rounded-lg bg-white">
              <Image
                src={heroImage}
                alt="驾培集训基地演示图"
                width={1400}
                height={900}
                priority
                className="h-72 w-full object-cover md:h-96"
              />
            </div>
            <form action="/bases" className="mt-4 grid gap-3 rounded-lg bg-white p-4 shadow-sm md:grid-cols-3">
              <input name="city" className="rounded-md border border-slate-200 px-3 py-2 text-sm" placeholder="城市/基地" />
              <select name="licenseType" className="rounded-md border border-slate-200 px-3 py-2 text-sm" defaultValue="">
                <option value="">车型</option>
                {["C1", "C2", "D", "E", "B2", "A2"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white">搜索基地</button>
            </form>
          </div>
        </div>
      </section>

      <Section>
        <div className="container-page grid gap-4 md:grid-cols-5">
          <StatCard label="覆盖省市" value={`${provinces.size}+`} helper="demo 数据覆盖全国重点省市" />
          <StatCard label="认证基地" value={`${bases.length}`} helper="平台审核制展示" />
          <StatCard label="可用床位" value={`${bases.reduce((sum, base) => sum + base.availableBeds, 0)}`} helper="宿舍动态容量" />
          <StatCard label="可培训车型" value="C1/C2/D/E/B2/A2" helper="多车型服务" />
          <StatCard label="企业团训能力" value="8 类" helper="车队与物流场景" />
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container-page">
          <SectionHeader title="平台核心服务能力" description="围绕全国招生、基地集训、食宿统一展示、价格透明、训练进度和加盟审核搭建业务闭环。" />
          <div className="grid gap-4 md:grid-cols-3">
            {["全国招生", "基地集训", "食宿一体", "价格透明", "进度跟踪", "加盟审核"].map((item, index) => (
              <Card key={item}>
                <CheckCircle2 className={index % 2 === 0 ? "h-6 w-6 text-blue-600" : "h-6 w-6 text-emerald-600"} />
                <h3 className="mt-3 font-bold text-slate-950">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item}能力以平台规则、基地资料、订单流程和后台数据为基础，支持演示和后续真实接入。
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <SectionHeader title="热门集训基地" action={<LinkButton href="/bases" variant="outline">全部基地</LinkButton>} />
          <div className="grid gap-4 lg:grid-cols-3">
            {bases.slice(0, 6).map((base) => (
              <BaseCard key={base.id} base={base} />
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container-page">
          <SectionHeader title="热门班型" action={<LinkButton href="/packages" variant="outline">全部班型</LinkButton>} />
          <div className="grid gap-4 lg:grid-cols-3">
            {packages.slice(0, 6).map((pack) => (
              <PackageCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page grid gap-4 lg:grid-cols-3">
          <Card>
            <TrainFront className="h-7 w-7 text-blue-600" />
            <h3 className="mt-3 text-xl font-bold">宿舍食堂展示</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              展示房型、床位、门禁、热水、餐标、食安制度和投诉渠道。
            </p>
            <div className="mt-4 flex gap-2">
              <LinkButton href="/dormitories" variant="outline">宿舍</LinkButton>
              <LinkButton href="/canteens" variant="outline">食堂</LinkButton>
            </div>
          </Card>
          <Card>
            <ShieldCheck className="h-7 w-7 text-emerald-600" />
            <h3 className="mt-3 text-xl font-bold">学员报名流程</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              选择基地与班型，提交资料，基地确认，支付定金，到校报到，跟踪训练进度。
            </p>
            <LinkButton href="/apply" className="mt-4" icon={<ArrowRight className="h-4 w-4" />}>
              提交报名
            </LinkButton>
          </Card>
          <Card>
            <Building2 className="h-7 w-7 text-blue-600" />
            <h3 className="mt-3 text-xl font-bold">企业团训与加盟入口</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              支持企业司机团训线索收集，后续加盟驾校需经过严格审核和试运营。
            </p>
            <div className="mt-4 flex gap-2">
              <LinkButton href="/enterprise" variant="outline">企业团训</LinkButton>
              <LinkButton href="/franchise" variant="outline">申请审核</LinkButton>
            </div>
          </Card>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container-page">
          <SectionHeader title="学员评价" />
          <div className="grid gap-4 md:grid-cols-3">
            {data.reviews.slice(0, 3).map((review) => (
              <Card key={review.id}>
                <div className="text-sm font-semibold text-slate-950">{review.studentName}</div>
                <div className="mt-1 text-amber-500">{"★".repeat(review.rating)}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{review.content}</p>
              </Card>
            ))}
          </div>
          <Card className="mt-6 border-blue-100 bg-blue-50">
            <p className="text-sm leading-6 text-blue-800">{COMPLIANCE_NOTICE} 不承诺包过、免考、代考或买卖驾驶证。</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
