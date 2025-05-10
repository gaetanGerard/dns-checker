import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";

export async function POST(req: NextRequest) {
  const { domains } = await req.json();
  if (!Array.isArray(domains)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Pour chaque domaine, lance nslookup et retourne le résultat
  const results = await Promise.all(
    domains.map(
      (domain: string) =>
        new Promise<{ domain: string; reachable: boolean }>((resolve) => {
          exec(`nslookup ${domain}`, (error, stdout, stderr) => {
            // Correction : considère comme joignable uniquement si il y a une adresse ET PAS d'erreur ET PAS de message d'échec explicite
            const out = (stdout || "") + (stderr || "");
            const isReachable =
              !/Non-existent domain|NXDOMAIN|server can't find|ne parvient pas à trouver|not found|can\'t find|not known|timed out|Name:\s*$/i.test(
                out
              ) && /Address:|Addresses:/i.test(out);
            resolve({ domain, reachable: Boolean(isReachable) });
          });
        })
    )
  );

  return NextResponse.json({ results });
}
