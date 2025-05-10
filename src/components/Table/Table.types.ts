import type { Profile } from "@/layout/ProfilesLayout/ProfilesLayout.types";

export type TableProps = {
  profiles: Profile[];
  onEdit: (profile: Profile) => void;
  onDelete: (id: number) => void;
};
