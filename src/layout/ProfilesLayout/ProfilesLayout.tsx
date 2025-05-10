"use client";

import React, { useState, useEffect } from "react";
import { useProfile } from "@/hooks/profile/useProfile";
import styles from "./ProfilesLayout.module.scss";

import Loading from "@/components/Loading/Loading";

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
  const [editProfile, setEditProfile] = useState<null | {
    id: number;
    name: string;
    domains: string;
  }>(null);

  // When Page loads, fetch profiles
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Add/Edit Submit profile and back to the list
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && domain) {
      if (editProfile) {
        updateProfile(editProfile.id, name, [domain]);
        setEditProfile(null);
      } else {
        addProfile(name, [domain]);
      }
      setName("");
      setDomain("");
      setIsFormVisible(false);
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
      setIsFormVisible(true);
    }
  };

  // Delete profile
  const handleDeleteProfile = (id: number) => {
    deleteProfile(id);
  };

  // Edit button (from the list)
  const handleEditProfile = (profile: {
    id: number;
    name: string;
    domains: string;
  }) => {
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

  /*
   * REFACTORING
   *
   * 1) components/Loading/Loading component
   * 2) components/ui/Title/Title component
   * 3) components/ui/Input/Input component
   * 4) components/ui/Button/Button component
   * 5) components/ui/Table/Table component
   * 6) components/ui/Table/TableHead/TableHead component
   * 7) components/ui/Table/TableRow/TableRow component
   *
   */

  return (
    <div className={styles.container}>
      <h1>Profiles</h1>
      {!loading ? (
        <Loading loadingText="Chargement des profils..." />
      ) : (
        <>
          {isFormVisible ? (
            <div className={styles.formContainer}>
              <h2>{editProfile ? "Éditer le profil" : "Ajouter un profil"}</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                  <label htmlFor="profileName">Nom du profil</label>
                  <input
                    type="text"
                    id="profileName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="profileDomain">Domaine</label>
                  <input
                    type="text"
                    id="profileDomain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.buttons}>
                  <button type="submit">
                    {editProfile ? "Enregistrer" : "Ajouter et terminer"}
                  </button>
                  {!editProfile && (
                    <button type="button" onClick={handleAddAndContinue}>
                      Ajouter et continuer
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsFormVisible(false)}
                    disabled={profiles.length === 0}
                    className={styles.btn}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          ) : profiles.length === 0 ? (
            <div className={styles.formContainer}>
              <h2>Ajouter un profil</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                  <label htmlFor="profileName">Nom du profil</label>
                  <input
                    type="text"
                    id="profileName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="profileDomain">Domaine</label>
                  <input
                    type="text"
                    id="profileDomain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.buttons}>
                  <button type="submit">Ajouter et terminer</button>
                  <button type="button" onClick={handleAddAndContinue}>
                    Ajouter et continuer
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormVisible(false)}
                    disabled={profiles.length === 0}
                    className={styles.btn}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
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
