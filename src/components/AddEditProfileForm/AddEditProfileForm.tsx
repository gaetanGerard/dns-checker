import React from "react";
import InputContainer from "@/components/InputContainer/InputContainer";
import Title from "@/components/ui/Title/Title";
import styles from "./AddEditProfileForm.module.scss";
import Button from "@/components/ui/Button/Button";

import type { AddEditProfileFormProps } from "./AddEditProfileForm.types";

import data from "@/data/pages/profiles.json";

const AddEditProfileForm = ({
  editProfile,
  name,
  domain,
  profilesLength,
  onNameChange,
  onDomainChange,
  onSubmit,
  onAddAndContinue,
  onCancel,
  helper,
  errors,
  onBlur,
  isFormValid,
}: AddEditProfileFormProps) => {
  return (
    <div className={styles.formContainer}>
      <Title level={2} className="profile-title">
        {editProfile ? data.form.title.edit : data.form.title.add}
      </Title>
      <form onSubmit={onSubmit} className={styles.form}>
        <InputContainer
          label={data.form.nameInput.label}
          inputId="profileName"
          value={name}
          onChange={onNameChange}
          inputClassName="profile-input"
          labelClassName="profile-label"
          placeholder={data.form.nameInput.placeholder}
          onBlur={() => onBlur("name")}
          helperText={helper?.name}
          errorText={errors?.name}
        />
        <InputContainer
          label={data.form.domainInput.label}
          inputId="profileDomain"
          value={domain}
          onChange={onDomainChange}
          inputClassName="profile-input"
          labelClassName="profile-label"
          placeholder={data.form.domainInput.placeholder}
          onBlur={() => onBlur("domain")}
          helperText={helper?.domain}
          errorText={errors?.domain}
        />
        <div className={styles.buttons}>
          <Button type="submit" disabled={!isFormValid}>
            {editProfile ? data.form.buttons.save : data.form.buttons.stop}
          </Button>
          {!editProfile && (
            <Button
              type="button"
              onClick={onAddAndContinue}
              disabled={!isFormValid}
            >
              {data.form.buttons.continue}
            </Button>
          )}
          <Button
            type="button"
            onClick={onCancel}
            disabled={profilesLength === 0}
            className="cancel-button"
          >
            {data.form.buttons.cancel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProfileForm;
