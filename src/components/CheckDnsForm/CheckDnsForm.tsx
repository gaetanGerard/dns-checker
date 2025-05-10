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

const CheckDnsForm: React.FC<CheckDnsFormProps> = ({
  profiles,
  selectedProfileId,
  onProfileChange,
  domains,
  onDomainsChange,
  error,
  onTest,
}) => {
  return (
    <div className={styles.checkDnsContainer}>
      <Title level={1} className="formTitle">
        Vérifier des DNS
      </Title>
      {profiles.length > 0 && (
        <Select
          id="profile-select"
          label="Profil :"
          value={selectedProfileId ?? ""}
          options={[
            { value: "", label: "Sélectionner un profil" },
            ...profiles.map((profile) => ({
              value: profile.id,
              label: profile.name,
            })),
          ]}
          onChange={(val) => onProfileChange(Number(val))}
        />
      )}
      <div style={{ height: "2rem" }} />
      <Textarea
        id="domains"
        label="Noms de domaine à tester :"
        value={domains}
        onChange={onDomainsChange}
        placeholder={
          selectedProfileId
            ? "Entrez un sous-domaine par ligne (ex: admin)"
            : "Entrez un nom de domaine par ligne (ex: admin.gge2705.synology.me)"
        }
        rows={6}
      >
        <InputHelper>
          {selectedProfileId
            ? "Un sous-domaine par ligne. Le domaine principal sera ajouté automatiquement."
            : "Un nom de domaine par ligne. Ne pas inclure http(s):// ou www."}
        </InputHelper>
        {error && <InputErrorMsg>{error}</InputErrorMsg>}
      </Textarea>
      <Button onClick={onTest} className="checkDnsBtn">
        Tester
      </Button>
    </div>
  );
};

export default CheckDnsForm;
