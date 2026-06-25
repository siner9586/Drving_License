import { NextResponse } from "next/server";
import { getBaseById } from "@/lib/data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const base = await getBaseById(id);
  if (!base) return NextResponse.json({ message: "基地不存在" }, { status: 404 });
  return NextResponse.json({ data: base });
}
