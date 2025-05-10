import React from "react";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import styles from "./TestDns.module.scss";
import type { TestDnsProps } from "./TestDns.types";


const TestDns: React.FC<TestDnsProps> = ({ results, loading, onRetry }) => {
  return (
    <div className={styles.testDnsContainer}>
      <Title level={1}>Résultat du test DNS</Title>
      <ul className={styles.resultList}>
        {results.map((r) => (
          <li key={r.domain} className={styles.resultItem}>
            <span>{r.domain}</span>
            {r.reachable === null ? (
              <span className={styles.loading}>Test en cours...</span>
            ) : r.reachable ? (
              <span className={styles.success}>est joignable</span>
            ) : (
              <span className={styles.error}>est injoignable</span>
            )}
          </li>
        ))}
      </ul>
      {!loading && (
        <Button onClick={onRetry} className="checkDnsBtn">
          Refaire un test
        </Button>
      )}
    </div>
  );
};

export default TestDns;
