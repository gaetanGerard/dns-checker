"use client";

import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import useNotification from "@/hooks/notification/useNotification";
import styles from "./ProfilesLayout.module.scss";

import Loading from "@/components/Loading/Loading";
import Title from "@/components/ui/Title/Title";
import AddEditProfileForm from "@/components/AddEditProfileForm/AddEditProfileForm";
import ProfileList from "@/components/ProfilesList/ProfilesList";
import Presentation from "@/components/ui/Presentation/Presentation";

import data from "@/data/pages/profiles.json";
import notificationsData from "@/data/notifications.json";
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

  const { notify } = useNotification();

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
        notify(
          `${notificationsData.profiles.edit[0]} ${name} ${notificationsData.profiles.edit[1]}`,
          "success"
        );
      } else {
        addProfile(name, [domain]);
        notify(notificationsData.profiles.add, "success");
      }
      resetForm();
    }
  };

  // Add Submit profile and continue
  const handleAddAndContinue = () => {
    if (name && domain) {
      notify(notificationsData.profiles.add, "success");
      addProfile(name, [domain]);
      setName("");
      setDomain("");
      setEditProfile(null);
      setIsFormVisible(true);
      setTouchedFields({ name: false, domain: false });
    }
  };

  // Cancel form
  const handleCancel = () => {
    resetForm();
  };

  // Delete profile
  const handleDeleteProfile = (id: number) => {
    deleteProfile(id);
    notify(notificationsData.profiles.delete, "success");
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

  return (
    <div className={styles.container}>
      <Title className="text-center">{data.pageTitle}</Title>
      <Presentation
        text={data.presentation}
        className="profile-presentation"
        align="center"
      />
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
            <ProfileList
              profiles={profiles}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
              onAdd={handleShowAddForm}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProfilesLayout;
