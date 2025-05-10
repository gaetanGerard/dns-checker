import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import styles from "./TestDns.module.scss";
import type { TestDnsProps } from "./TestDns.types";

const TestDns: React.FC<TestDnsProps> = ({
  results,
  loading,
  onRetry,
  onFlushDns,
}) => {
  // Open external link in default browser (Electron)
  const handleDomainClick = (
    url: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    // @ts-ignore
    if (window.electron && window.electron.openExternal) {
      // @ts-ignore
      window.electron.openExternal(url);
    } else {
      window.open(url, "_blank", "noopener");
    }
  };

  const hasFailed = results.some((r) => r.reachable === false);
  const failed = results
    .filter((r) => r.reachable === false)
    .map((r) => r.domain);

  return (
    <div className={styles.testDnsContainer}>
      <Title level={1} className="checkDnsTitle">
        Résultat du test DNS
      </Title>
      <ul className={styles.resultList}>
        {results.map((r) => (
          <li key={r.domain} className={styles.resultItem}>
            <a
              href={`https://${r.domain}`}
              className={styles.domainLink}
              onClick={(e) => handleDomainClick(`https://${r.domain}`, e)}
              rel="noopener noreferrer"
            >
              {r.domain}
            </a>
            {r.reachable === null ? (
              <span className={styles.loading}>
                Test en cours...
                <span className={styles.loader} />
              </span>
            ) : r.reachable ? (
              <span className={styles.success}>
                est joignable
                <span className={`${styles.icon} ${styles.iconSuccess}`}>
                  <CheckCircle size={18} />
                </span>
              </span>
            ) : (
              <span className={styles.error}>
                est injoignable
                <span className={`${styles.icon} ${styles.iconError}`}>
                  <XCircle size={18} />
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
      {!loading && (
        <div style={{ display: "flex", gap: 16 }}>
          <Button
            onClick={onRetry}
            className={styles.dnsActionBtn + " checkDnsBtn"}
          >
            Refaire un test
          </Button>
          {hasFailed && onFlushDns && (
            <Button
              onClick={() => onFlushDns(failed)}
              variant="secondary"
              className={styles.dnsActionBtn}
            >
              Vider le cache DNS
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TestDns;
