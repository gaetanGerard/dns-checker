import { NextRequest, NextResponse } from "next/server";
import { deleteProfile, updateProfile } from "@/database/database";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params;
  const { id } = params;
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  deleteProfile(Number(id));
  return NextResponse.json({ message: "Profile deleted" });
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params;
  const { id } = params;
  const { name, domains } = await req.json();
  if (!id || !name || !domains) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  updateProfile(Number(id), name, domains);
  return NextResponse.json({ message: "Profile updated" });
}
