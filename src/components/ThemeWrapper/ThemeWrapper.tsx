"use client";

import { ThemeProvider } from "@/context/theme/ThemeProvider";
import useTheme from "@/hooks/theme/useTheme";
import { ReactNode, useEffect } from "react";

function ThemeApplier({ children }: { children: ReactNode }) {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("dark", "light");
      document.body.classList.add(isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  return <>{children}</>;
}

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeApplier>{children}</ThemeApplier>
    </ThemeProvider>
  );
}
