import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onThemeChanged: (callback: (isDarkMode: boolean) => void) => {
    ipcRenderer.on("theme-changed", (event, isDarkMode) =>
      callback(isDarkMode)
    );
  },
  toggleTheme: (isDarkMode: boolean) => {
    ipcRenderer.send("toggle-theme", isDarkMode);
  },
});
