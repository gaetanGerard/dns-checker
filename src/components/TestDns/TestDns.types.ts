export interface DnsTestResult {
  domain: string;
  reachable: boolean | null;
}

export interface TestDnsProps {
  results: DnsTestResult[];
  loading: boolean;
  onRetry: () => void;
}
