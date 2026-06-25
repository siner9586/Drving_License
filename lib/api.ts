import type { NextRequest } from "next/server";

export async function readPayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await request.json()) as Record<string, unknown>;
  }
  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

export function boolValue(value: unknown) {
  return value === true || value === "true" || value === "on" || value === "1";
}
