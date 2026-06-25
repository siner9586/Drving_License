import type { Role } from "@/lib/types";

export interface DemoSession {
  userId: string;
  name: string;
  role: Role;
  province?: string;
  city?: string;
  baseId?: string;
}

export function getDemoSession(role: Role = "ADMIN"): DemoSession {
  const sessions: Record<Role, DemoSession> = {
    STUDENT: { userId: "user_student_demo", name: "演示学员", role: "STUDENT", province: "广东省", city: "广州" },
    MERCHANT: { userId: "user_merchant_demo", name: "基地运营演示", role: "MERCHANT", province: "广东省", city: "广州", baseId: "base_001" },
    OPERATOR: { userId: "user_operator_demo", name: "华南区域运营", role: "OPERATOR", province: "广东省", city: "广州" },
    ADMIN: { userId: "user_admin_demo", name: "平台管理员", role: "ADMIN" }
  };

  return sessions[role];
}
