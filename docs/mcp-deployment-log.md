# MCP 部署日志

## 检测到哪些 MCP

`codex mcp list` 检测到 `github`、`neon`、`vercel`、`context7`、`filesystem`、`playwright`，以及 Cloudflare 相关 MCP。

## 调用了哪些 MCP

已通过工具发现加载 GitHub、Neon、Vercel MCP 工具。

- Neon MCP：`create_project`、`run_sql`、`get_connection_string`、`list_branch_computes`
- Vercel MCP：`deploy_to_vercel`，该工具返回 CLI 部署指引，因此后续使用 Vercel CLI fallback
- GitHub MCP：已加载工具，最终推送阶段优先检查，必要时使用 git/gh CLI

## 是否创建 Neon 项目

已创建 Neon 项目：

- 项目名称：`drving-license-prod`
- Project ID：`cold-glade-28313218`
- Branch：`main`
- Branch ID：`br-solitary-darkness-ajfbovey`
- 数据库：`drving_license`

连接串已写入本地 `.env` 并用于 Prisma 初始化，未写入仓库。

## 是否创建 Vercel 项目

已通过 Vercel CLI 创建并关联项目：

- Vercel 项目：`drving-license`
- Scope：`githubcomsiner9586excavator`
- Framework：Next.js

## 是否设置环境变量

已设置 Vercel Production 环境变量：

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`
- `AUTH_SECRET`
- `PAYMENT_PROVIDER`
- `SMS_PROVIDER`
- `MAP_PROVIDER`
- `NEXT_PUBLIC_DEMO_MODE`

第一轮写入因 shell 解析本地 `.env` 中连接串的 `&` 失败而产生空值，已删除并用逐行读取方式重新写入。随后添加 `.vercelignore` 排除本地 `.env*`，避免 CLI 上传本地环境文件。

## 是否部署成功

已成功部署到 Vercel Production。

- 最终 Production URL：`https://drving-license-ten.vercel.app`
- 最终 Deployment ID：`dpl_xtFhtfbk13NHqS7LQ3D9VhQNvHFE`
- 线上首页验证：HTTP 200
- 线上 `/api/bases` 验证：返回 Neon 数据

## 如果失败，失败原因是什么

无最终失败。中间 Vercel MCP 仅返回 CLI 指引，不直接部署；已使用 Vercel CLI fallback 完成。

## 使用了哪些 fallback

本地应用已实现 mock fallback：无 `DATABASE_URL` 时页面和 API 使用演示数据。

部署 fallback：

- Vercel MCP 不直接部署，使用 Vercel CLI 完成 link、env 和 production deploy。
- Neon 已通过 MCP 完成，无需 neonctl。
