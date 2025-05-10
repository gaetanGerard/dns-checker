"use client";

import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import styles from "./ProfilesLayout.module.scss";

import Loading from "@/components/Loading/Loading";
import Title from "@/components/ui/Title/Title";
import AddEditProfileForm from "@/components/AddEditProfileForm/AddEditProfileForm";

import data from "@/data/pages/profiles.json";
import { Profile } from "./ProfilesLayout.types";
import { isValidDomain } from "@/utils/functions";

const ProfilesLayout = () => {
  const {
    profiles,
    loading,
    addProfile,
    deleteProfile,
    fetchProfiles,
    updateProfile,
  } = useProfile();

  // Form states
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editProfile, setEditProfile] = useState<null | Profile>(null);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    domain: false,
  });

  const helper = {
    name: data.form.helper.name,
    domain: data.form.helper.domain,
  };

  const errors = {
    name:
      touchedFields.name && name.trim().length === 0
        ? data.form.errors.name
        : undefined,
    domain:
      touchedFields.domain && !isValidDomain(domain)
        ? data.form.errors.domain
        : undefined,
  };

  const isFormValid = name.trim().length > 0 && isValidDomain(domain);

  // When Page loads, fetch profiles
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Show form automatically if no profiles after fetch
  useEffect(() => {
    if (!loading && profiles.length === 0) {
      setIsFormVisible(true);
    }
  }, [loading, profiles]);

  const resetForm = () => {
    setName("");
    setDomain("");
    setEditProfile(null);
    setIsFormVisible(false);
    setTouchedFields({ name: false, domain: false });
  };

  // Add/Edit Submit profile and back to the list
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && domain) {
      if (editProfile) {
        updateProfile(editProfile.id, name, [domain]);
      } else {
        addProfile(name, [domain]);
      }
      resetForm();
    }
  };

  // Add Submit profile and continue
  const handleAddAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && domain) {
      addProfile(name, [domain]);
      setName("");
      setDomain("");
      setEditProfile(null);
      setTouchedFields({ name: false, domain: false });
      setIsFormVisible(true);
    }
  };

  // Cancel form
  const handleCancel = () => {
    resetForm();
  };

  // Delete profile
  const handleDeleteProfile = (id: number) => {
    deleteProfile(id);
  };

  // Edit button (from the list)
  const handleEditProfile = (profile: Profile) => {
    setEditProfile(profile);
    setName(profile.name);
    setDomain(profile.domains);
    setIsFormVisible(true);
  };

  // Add button (from the list)
  const handleShowAddForm = () => {
    setEditProfile(null);
    setName("");
    setDomain("");
    setIsFormVisible(true);
  };

  const handleBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  /*
   * REFACTORING
   *
   * 5) components/ui/Table/Table component
   * 6) components/ui/Table/TableHead/TableHead component
   * 7) components/ui/Table/TableRow/TableRow component
   *
   */

  return (
    <div className={styles.container}>
      <Title className="text-center">{data.pageTitle}</Title>
      {loading ? (
        <Loading loadingText={data.loadingText} />
      ) : (
        <>
          {isFormVisible ? (
            <AddEditProfileForm
              editProfile={editProfile}
              name={name}
              domain={domain}
              profilesLength={profiles.length}
              onNameChange={(e) => setName(e.target.value)}
              onDomainChange={(e) => setDomain(e.target.value)}
              onSubmit={handleSubmit}
              onAddAndContinue={handleAddAndContinue}
              onCancel={handleCancel}
              helper={helper}
              errors={errors}
              onBlur={handleBlur}
              isFormValid={isFormValid}
            />
          ) : (
            <div className={styles.profileList}>
              <button className={styles.btn} onClick={handleShowAddForm}>
                Ajouter un profil
              </button>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Nom</th>
                    <th className={styles.th}>Domaine</th>
                    <th className={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile.id}>
                      <td className={styles.td}>{profile.name}</td>
                      <td className={styles.td}>{profile.domains}</td>
                      <td className={styles.td}>
                        <button
                          className={styles.btn}
                          onClick={() => handleEditProfile(profile)}
                        >
                          Editer
                        </button>
                        <button
                          className={styles.btn}
                          onClick={() => handleDeleteProfile(profile.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilesLayout;
