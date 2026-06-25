import type { Role } from "@/lib/types";

export const PERMISSIONS = {
  STUDENT: [
    "view:bases",
    "view:packages",
    "create:application",
    "view:orders",
    "view:progress",
    "create:complaint",
    "create:refund",
    "create:review"
  ],
  MERCHANT: [
    "manage:own-base",
    "manage:packages",
    "manage:dormitories",
    "manage:canteens",
    "view:base-orders",
    "update:progress",
    "handle:base-complaints",
    "handle:base-refunds",
    "manage:capacity"
  ],
  OPERATOR: [
    "view:region-data",
    "review:region-bases",
    "manage:region-orders",
    "view:region-complaints",
    "view:region-refunds",
    "manage:enterprise-leads",
    "pre-review:franchise"
  ],
  ADMIN: [
    "manage:platform",
    "review:franchise",
    "manage:orders",
    "manage:risk",
    "arbitrate:complaints",
    "audit:refunds",
    "manage:rules",
    "view:dashboard"
  ]
} as const satisfies Record<Role, readonly string[]>;

export type Permission = (typeof PERMISSIONS)[Role][number];

export function hasPermission(role: Role, permission: string) {
  return PERMISSIONS[role].includes(permission as never);
}

export function getPermissions(role: Role) {
  return PERMISSIONS[role];
}
