import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  theme: (callback: (event: Electron.IpcRendererEvent, theme: string) => void) => {
    ipcRenderer.on("theme-change", callback);
  },
});
