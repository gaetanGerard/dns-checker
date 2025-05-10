import type { Profile } from "@/layout/ProfilesLayout/ProfilesLayout.types";

export type TableRowProps = {
  profile: Profile;
  onEdit: () => void;
  onDelete: () => void;
};
