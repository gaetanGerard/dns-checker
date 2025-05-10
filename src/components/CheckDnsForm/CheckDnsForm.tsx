"use client";

import React from "react";
import Title from "@/components/ui/Title/Title";
import Button from "@/components/ui/Button/Button";
import InputHelper from "@/components/ui/InputHelper/InputHelper";
import InputErrorMsg from "@/components/ui/InputErrorMsg/InputErrorMsg";
import Select from "@/components/ui/Select/Select";
import Textarea from "@/components/ui/Textarea/Textarea";
import styles from "./CheckDnsForm.module.scss";
import type { CheckDnsFormProps } from "./CheckDnsForm.types";
import data from "@/data/pages/checkdns.json";

const CheckDnsForm: React.FC<CheckDnsFormProps> = ({
  profiles,
  selectedProfileId,
  onProfileChange,
  domains,
  onDomainsChange,
  error,
  onTest,
}) => {
  const { title, select, textarea, inputhelper, testbtn } = data.checkdnsform;
  return (
    <div className={styles.checkDnsContainer}>
      <Title level={1} className="formTitle">
        {title}
      </Title>
      <div className={styles["form-container"]}>
        {profiles.length > 0 && (
          <Select
            id="profile-select"
            label={select.label}
            value={selectedProfileId ?? ""}
            options={[
              { value: "", label: select.options.label },
              ...profiles.map((profile) => ({
                value: profile.id,
                label: profile.name,
              })),
            ]}
            onChange={(val) => onProfileChange(Number(val))}
          />
        )}
        <Textarea
          id="domains"
          label={textarea.label}
          value={domains}
          onChange={onDomainsChange}
          placeholder={
            selectedProfileId
              ? textarea.placeholder.selectedProfile
              : textarea.placeholder.unselectedProfile
          }
          rows={6}
        >
          <InputHelper>
            {selectedProfileId
              ? inputhelper.selectedProfile
              : inputhelper.unselectedProfile}
          </InputHelper>
          {error && <InputErrorMsg>{error}</InputErrorMsg>}
        </Textarea>
        <Button
          type="submit"
          className="checkDnsBtn"
          disabled={domains.trim().length === 0}
          onClick={onTest}
        >
          {testbtn}
        </Button>
      </div>
    </div>
  );
};

export default CheckDnsForm;
