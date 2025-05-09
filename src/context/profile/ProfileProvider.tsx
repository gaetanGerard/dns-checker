"use client";

import React, { useEffect, useState } from "react";
import ProfileContext from "./ProfileContext";
import { Profile } from "@/database/models/Profile";

type ProfileContextType = {
  profiles: Profile[];
  loading: boolean;
  fetchProfiles: () => void;
  addProfile: (name: string, domains: string[]) => void;
  deleteProfile: (id: number) => void;
  updateProfile: (id: number, name: string, domains: string[]) => void;
};

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profiles");
      const data: Profile[] = await res.json();
      setProfiles(data);
    } catch (err) {
      console.error("Failed to fetch profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const addProfile = async (name: string, domains: string[]) => {
    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, domains }),
      });

      if (res.ok) {
        fetchProfiles();
      }
    } catch (err) {
      console.error("Failed to add profile:", err);
    }
  };

  const deleteProfile = async (id: number) => {
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchProfiles();
      }
    } catch (err) {
      console.error("Failed to delete profile:", err);
    }
  };

  const updateProfile = async (id: number, name: string, domains: string[]) => {
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, domains }),
      });
      if (res.ok) {
        fetchProfiles();
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        loading,
        fetchProfiles,
        addProfile,
        deleteProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
