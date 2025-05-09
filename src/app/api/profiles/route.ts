import { NextRequest, NextResponse } from "next/server";
import { getProfiles, addProfile } from "@/database/database";

export async function GET() {
  return new Promise((resolve) => {
    getProfiles((err, rows) => {
      if (err)
        return resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
      resolve(NextResponse.json(rows));
    });
  });
}

export async function POST(req: NextRequest) {
  const { name, domains } = await req.json();
  if (!name || !domains)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  addProfile(name, domains);
  return NextResponse.json({ message: "Profile added" }, { status: 201 });
}
