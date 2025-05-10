import { Profile } from "@/layout/ProfilesLayout/ProfilesLayout.types";

export type ProfileListProps = {
  profiles: Profile[];
  onEdit: (profile: Profile) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
};
