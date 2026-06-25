# 全国驾培集训平台 MVP

本仓库是 `Drving_License` 的产品级 MVP：全国驾培集训与食宿一体化服务平台。平台面向全国学员展示经过审核的驾培集训基地，支持基地、班型、宿舍、食堂、报名、订单、报到、训练进度、投诉、退款、评价、企业团训和加盟审核流程。

## 项目定位

平台提供驾培课程、集训班型、宿舍住宿、食堂餐饮、接站、报到管理、训练进度、企业团训、新手上路陪练和加盟驾校审核服务。平台不做驾驶证交易，不承诺考试结果。

## 合规边界

平台仅提供培训、住宿、餐饮、报到、进度跟踪和售后保障服务。考试预约及考试结果以当地交管部门规则为准。不承诺包过、免考、代考或买卖驾驶证。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- 自建高质量 UI 组件
- Prisma ORM
- PostgreSQL / Neon
- Vercel
- ESLint
- API Routes
- Mock fallback

## 页面清单

- `/` 首页
- `/bases` 基地列表
- `/bases/[id]` 基地详情
- `/packages` 班型列表
- `/packages/[id]` 班型详情
- `/dormitories` 宿舍展示
- `/canteens` 食堂展示
- `/apply` 报名申请
- `/orders` 订单中心
- `/orders/[id]` 订单详情
- `/progress` 学员进度
- `/enterprise` 企业团训
- `/franchise` 加盟审核申请
- `/admin` 平台后台
- `/merchant` 基地后台
- `/operator` 区域运营后台
- `/rules` 平台规则
- `/privacy` 隐私政策

## 后台清单

- 平台后台：数据总览、基地管理、加盟审核、订单、投诉、退款、风控、规则
- 基地后台：基地概览、容量、班型、宿舍、食堂、学员名单、进度管理
- 区域后台：区域数据、基地、订单、投诉、退款、企业线索、加盟初审、排行榜、容量预警

## 本地运行

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`。

## 环境变量

复制 `.env.example` 为 `.env`，生产环境至少配置：

```bash
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_APP_URL=
AUTH_SECRET=
```

本地没有 `DATABASE_URL` 时，页面和 API 会自动使用 `lib/mock-data.ts` 的演示数据。

## 数据库初始化

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

## 构建命令

```bash
npm run lint
npm run typecheck
npm run build
```

## Vercel 部署

1. 在 Vercel 创建或关联项目 `drving-license`。
2. Framework 选择 Next.js。
3. 配置 `DATABASE_URL`、`DIRECT_URL`、`NEXT_PUBLIC_APP_URL`、`NEXT_PUBLIC_APP_NAME`、`AUTH_SECRET`、`PAYMENT_PROVIDER=mock`、`SMS_PROVIDER=mock`、`MAP_PROVIDER=mock`、`NEXT_PUBLIC_DEMO_MODE=true`。
4. 使用 Vercel 直接构建部署，不需要 GitHub Actions。

## Neon 配置

1. 创建 Neon 项目 `drving-license-prod`。
2. 创建数据库 `drving_license`。
3. 获取 pooled `DATABASE_URL` 和 direct `DIRECT_URL`。
4. 本地或 Vercel 配置环境变量。
5. 执行 Prisma push 和 seed。

## API 清单

- `GET /api/bases`
- `GET /api/bases/[id]`
- `GET /api/packages`
- `GET /api/packages/[id]`
- `POST /api/applications`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/[id]`
- `PATCH /api/orders/[id]`
- `POST /api/franchise`
- `PATCH /api/franchise/[id]/audit`
- `POST /api/complaints`
- `POST /api/refunds`
- `POST /api/reviews`
- `PATCH /api/progress/[orderId]`
- `GET /api/dashboard/admin`
- `GET /api/dashboard/merchant`
- `GET /api/dashboard/operator`
- `POST /api/enterprise`

## 演示账号

第一版使用 mock session 和角色权限预留：

- 平台管理员：`user_admin_demo`
- 基地商户：`user_merchant_demo`
- 区域运营：`user_operator_demo`
- 学员：seed 中的 `user_001` 起

## 后续路线图

P1：真实登录认证、支付、短信、文件上传、地图、客服工单、合同签署、Vercel 环境变量自动化。  
P2：多租户商户权限、结算分账、动态库存、风控审核台、加盟试运营评分、企业客户报价单、BI 报表。
