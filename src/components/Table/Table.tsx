import styles from "./Table.module.scss";
import TableHead from "./TableHead/TableHead";
import TableRow from "./TableRow/TableRow";
import type { TableProps } from "./Table.types";

export default function Table({ profiles, onEdit, onDelete }: TableProps) {
  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <TableHead />
        <tbody>
          {profiles.map((profile) => (
            <TableRow
              key={profile.id}
              profile={profile}
              onEdit={() => onEdit(profile)}
              onDelete={() => onDelete(profile.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
