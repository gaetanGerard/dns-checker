import styles from "./TableHead.module.scss";

export default function TableHead() {
  return (
    <thead>
      <tr className={styles.tr}>
        <th className={styles.th}>Nom</th>
        <th className={styles.th}>Domaine</th>
        <th className={styles.th}>Actions</th>
      </tr>
    </thead>
  );
}
