"use client";

import { useState } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import CheckDnsForm from "@/components/CheckDnsForm/CheckDnsForm";
import TestDns from "@/components/TestDns/TestDns";
import type { DnsTestResult } from "@/components/TestDns/TestDns.types";

const CheckDnsLayout: React.FC = () => {
  const { profiles } = useProfile();
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null
  );
  const [domains, setDomains] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DnsTestResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function testDomainsWithApi(
    domains: string[]
  ): Promise<DnsTestResult[]> {
    const res = await fetch("/api/check-dns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domains }),
    });
    const data = await res.json();
    return data.results as DnsTestResult[];
  }

  const handleProfileChange = (id: number) => {
    setSelectedProfileId(id);
    const selected = profiles.find((p) => p.id === id);
    if (selected) {
      console.log("Profil sélectionné:", selected);
    }
  };

  const handleDomainsChange = (value: string) => {
    setDomains(value);
    setError(null);
  };

  const handleTest = async () => {
    const lines = domains
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    let result: string[] = [];
    if (selectedProfileId) {
      const selected = profiles.find((p) => p.id === selectedProfileId);
      if (selected) {
        const profileDomain = selected.domains.trim();
        result = lines.map((line) => {
          if (line.endsWith("." + profileDomain) || line === profileDomain) {
            return line;
          }
          if (!line.includes(".")) {
            return `${line}.${profileDomain}`;
          }
          return line;
        });
      }
    } else {
      result = lines;
    }
    setError(null);
    setLoading(true);
    setResults(result.map((domain) => ({ domain, reachable: null })));
    try {
      const apiResults = await testDomainsWithApi(result);
      setResults(apiResults);
    } catch (e) {
      setError("Erreur lors du test DNS.");
    }
    setLoading(false);
  };

  return results ? (
    <TestDns
      results={results}
      loading={loading}
      onRetry={() => {
        setResults(null);
        setLoading(false);
      }}
    />
  ) : (
    <CheckDnsForm
      profiles={profiles.map(({ id, name }) => ({ id, name }))}
      selectedProfileId={selectedProfileId}
      onProfileChange={handleProfileChange}
      domains={domains}
      onDomainsChange={handleDomainsChange}
      error={error}
      onTest={handleTest}
    />
  );
};

export default CheckDnsLayout;
