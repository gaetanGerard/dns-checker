"use client";

import React from "react";
import useTheme from "@/hooks/theme/useTheme";
import styles from "./Preferences.module.scss";

export default function Preferences() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Preferences</h2>
      <label className={styles.toggleWrapper}>
        <span>Dark mode</span>
        <div
          className={`${styles.toggle} ${isDarkMode ? styles.checked : ""}`}
          onClick={toggleTheme}
        />
      </label>
    </div>
  );
}
