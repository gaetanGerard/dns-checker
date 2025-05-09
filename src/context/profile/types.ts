import { Profile } from "@/database/models/Profile";

export type ProfileContextType = {
  profiles: Profile[];
  loading: boolean;
  fetchProfiles: () => void;
  addProfile: (name: string, domains: string[]) => void;
  deleteProfile: (id: number) => void;
  updateProfile: (id: number, name: string, domains: string[]) => void;
};
