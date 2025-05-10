import styles from "./TableHead.module.scss";

import data from "@/data/pages/profiles.json";

export default function TableHead() {
  const { table } = data.profiles;
  return (
    <thead>
      <tr className={styles.tr}>
        {table.thead.map((text, i) => (
          <th className={styles.th} key={i}>
            {text}
          </th>
        ))}
      </tr>
    </thead>
  );
}
