import type { RiskLevel } from "@/lib/types";

export const FORBIDDEN_KEYWORDS = [
  "包过",
  "买证",
  "卖证",
  "代考",
  "免考",
  "内部名额",
  "考试答案",
  "快速拿证",
  "保证拿证",
  "关系办理",
  "买分",
  "卖分",
  "不用考试",
  "直接拿证",
  "托关系",
  "包办驾驶证",
  "假证",
  "伪造"
] as const;

const CRITICAL_KEYWORDS = ["买证", "卖证", "代考", "考试答案", "假证", "伪造", "买分", "卖分"];
const HIGH_KEYWORDS = ["包过", "免考", "内部名额", "快速拿证", "保证拿证", "不用考试", "直接拿证", "关系办理", "托关系", "包办驾驶证"];

export interface RiskResult {
  blocked: boolean;
  riskFlag: boolean;
  level: RiskLevel;
  keywords: string[];
  message: string;
}

export function detectRisk(content?: string | null): RiskResult {
  const text = content?.trim() || "";
  const keywords = FORBIDDEN_KEYWORDS.filter((keyword) => text.includes(keyword));
  const level: RiskLevel = keywords.some((keyword) => CRITICAL_KEYWORDS.includes(keyword))
    ? "CRITICAL"
    : keywords.some((keyword) => HIGH_KEYWORDS.includes(keyword))
      ? "HIGH"
      : keywords.length > 0
        ? "MEDIUM"
        : "LOW";

  return {
    blocked: level === "CRITICAL" || level === "HIGH",
    riskFlag: keywords.length > 0,
    level,
    keywords,
    message:
      keywords.length > 0
        ? "内容包含平台禁售禁发风险词，请删除违规表述后重新提交。"
        : "未发现禁词风险。"
  };
}

export function riskSnippet(content: string, keyword: string) {
  const index = content.indexOf(keyword);
  if (index < 0) return content.slice(0, 80);
  const start = Math.max(0, index - 24);
  const end = Math.min(content.length, index + keyword.length + 24);
  return content.slice(start, end);
}
