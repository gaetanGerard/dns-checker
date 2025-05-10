import Button from "@/components/ui/Button/Button";
import styles from "./TableRow.module.scss";
import { Edit, Trash2 } from "lucide-react";

import { TableRowProps } from "./TableRow.types";

export default function TableRow({ profile, onEdit, onDelete }: TableRowProps) {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{profile.name}</td>
      <td className={styles.td}>{profile.domains}</td>
      <td className={styles.td}>
        <Button
          onClick={onEdit}
          icon={<Edit size={16} />}
          variant="icon-button"
          className="edit-btn"
        />
        <Button
          onClick={onDelete}
          icon={<Trash2 size={16} />}
          variant="icon-button"
          className="delete-btn"
        />
      </td>
    </tr>
  );
}
