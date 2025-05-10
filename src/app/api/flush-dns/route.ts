import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req: NextRequest) {
  // Windows: ipconfig /flushdns
  return new Promise((resolve) => {
    exec("ipconfig /flushdns", (error, stdout, stderr) => {
      if (error) {
        resolve(
          NextResponse.json(
            { success: false, message: stderr || "Erreur lors du flush DNS." },
            { status: 500 }
          )
        );
      } else {
        resolve(
          NextResponse.json({
            success: true,
            message: stdout || "Cache DNS vidé.",
          })
        );
      }
    });
  });
}
