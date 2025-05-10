export interface CheckDnsFormProps {
  profiles: { id: number; name: string }[];
  selectedProfileId: number | null;
  onProfileChange: (id: number) => void;
  domains: string;
  onDomainsChange: (value: string) => void;
  error: string | null;
  onTest: () => void;
}
