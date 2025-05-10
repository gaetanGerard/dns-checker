"use client";

import type { ProfileListProps } from "./ProfilesList.types";

import styles from "./ProfilesList.module.scss";
import Table from "@/components/Table/Table";
import Button from "@/components/ui/Button/Button";

export default function ProfileList({
  profiles,
  onEdit,
  onDelete,
  onAdd,
}: ProfileListProps) {
  return (
    <div className={styles.profileList}>
      <Button onClick={onAdd} className="start">
        Ajouter un profil
      </Button>
      <Table profiles={profiles} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
