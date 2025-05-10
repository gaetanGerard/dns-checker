"use client";

import type { ProfileListProps } from "./ProfilesList.types";

import styles from "./ProfilesList.module.scss";
import Table from "@/components/Table/Table";
import Button from "@/components/ui/Button/Button";

import data from "@/data/pages/profiles.json";

export default function ProfileList({
  profiles,
  onEdit,
  onDelete,
  onAdd,
}: ProfileListProps) {
  return (
    <div className={styles.profileList}>
      <Button onClick={onAdd} className="start">
        {data.profiles.btnAdd}
      </Button>
      <Table profiles={profiles} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
