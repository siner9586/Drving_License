# 部署说明

## 本地启动

```bash
npm install
npm run dev
```

## Neon 创建

优先使用 Neon MCP 创建 `drving-license-prod` 项目和 `drving_license` 数据库。MCP 不可用时使用 `neonctl` 或 Neon Console。

## DATABASE_URL 配置

生产环境配置 pooled `DATABASE_URL`，迁移和 seed 可配置 direct `DIRECT_URL`。

## Prisma migrate

MVP 使用：

```bash
npm run prisma:generate
npm run prisma:push
```

后续生产建议改为 Prisma migrate。

## Seed

```bash
npm run prisma:seed
```

## Vercel 项目创建

优先使用 Vercel MCP 或 Vercel CLI 创建/关联 `drving-license` 项目，Framework 选择 Next.js。

## Vercel 环境变量

配置 `DATABASE_URL`、`DIRECT_URL`、`NEXT_PUBLIC_APP_URL`、`NEXT_PUBLIC_APP_NAME`、`AUTH_SECRET`、`PAYMENT_PROVIDER=mock`、`SMS_PROVIDER=mock`、`MAP_PROVIDER=mock`、`NEXT_PUBLIC_DEMO_MODE=true`。

## Vercel 部署

```bash
vercel --prod
```

## GitHub 推送

```bash
git add .
git commit -m "feat: build national driving training camp platform MVP"
git push origin main
```

## MCP 自动部署说明

本项目会优先尝试 Neon、Vercel 和 GitHub MCP；若缺少权限或工具能力，则记录失败原因并使用 CLI fallback。

## CLI 备用部署说明

Vercel CLI 已登录时可直接 `vercel link` 和 `vercel --prod`。Neon CLI 若不可用，需用户在 Console 创建数据库并复制连接串。

## 常见错误

- 缺少 `DATABASE_URL`：页面不会崩溃，但数据库写入不会生效。
- Prisma 未生成：执行 `npm run prisma:generate`。
- Vercel 构建缺环境变量：配置后重新部署。
- Neon 连接超时：检查 pooled URL、IP 限制和分支状态。
