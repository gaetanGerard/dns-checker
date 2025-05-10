"use client";

import { useState } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import useNotification from "@/hooks/notification/useNotification";
import CheckDnsForm from "@/components/CheckDnsForm/CheckDnsForm";
import TestDns from "@/components/TestDns/TestDns";
import type { DnsTestResult } from "@/components/TestDns/TestDns.types";
import data from "@/data/pages/checkdns.json";

const CheckDnsLayout: React.FC = () => {
  const { flushDnsMsg, handleTestMsg } = data.checkdnslayout;
  const { profiles } = useProfile();
  const { notify } = useNotification();
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

  async function handleFlushDnsAndRetry(failedDomains: string[]) {
    try {
      const res = await fetch("/api/flush-dns", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        notify(flushDnsMsg.success, "success");
        setLoading(true);
        setResults(
          failedDomains.map((domain) => ({ domain, reachable: null }))
        );
        const apiResults = await testDomainsWithApi(failedDomains);
        setResults(apiResults);
      } else {
        notify(data.message || flushDnsMsg.error, "error");
      }
    } catch (e) {
      notify(flushDnsMsg.error, "error");
    }
    setLoading(false);
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
      setError(handleTestMsg.error);
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
      onFlushDns={handleFlushDnsAndRetry}
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
