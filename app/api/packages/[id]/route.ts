import { NextResponse } from "next/server";
import { getPackageById } from "@/lib/data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pack = await getPackageById(id);
  if (!pack) return NextResponse.json({ message: "班型不存在" }, { status: 404 });
  return NextResponse.json({ data: pack });
}
