"use client";

import React, { createContext, useContext } from "react";
import type { ThemeContextType } from "./types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
