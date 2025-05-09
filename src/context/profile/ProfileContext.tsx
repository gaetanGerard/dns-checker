"use client";
import { createContext } from "react";
import { ProfileContextType } from "./types";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export default ProfileContext;