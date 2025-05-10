import { Profile } from "@/layout/ProfilesLayout/ProfilesLayout.types";

export interface AddEditProfileFormProps {
  editProfile: Profile | null;
  name: string;
  domain: string;
  profilesLength: number;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDomainChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onAddAndContinue: () => void;
  onCancel: () => void;
  onBlur: (field: "name" | "domain") => void;
  isFormValid: boolean;
  helper?: Helper;
  errors?: Error;
}

type Helper = {
  name?: string;
  domain?: string;
};

type Error = {
  name?: string | undefined;
  domain?: string | undefined;
};
