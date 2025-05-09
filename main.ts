import { fileURLToPath } from "url";
import { dirname } from "path";
import { app, BrowserWindow, Menu, MenuItem, nativeTheme } from "electron";

const __dirname = dirname(fileURLToPath(import.meta.url));

let win: BrowserWindow | null = null;

function createWindow() {
  const isDarkMode = nativeTheme.shouldUseDarkColors;

  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
    },
    icon: __dirname + "/../public/assets/icons/dns.ico",
  });

  win.loadURL("http://localhost:3000");

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("theme-change", isDarkMode ? "dark" : "light");
  });

  const menu = Menu.getApplicationMenu() || Menu.buildFromTemplate([]);

  const settingsMenu = {
    label: "Settings",
    submenu: [
      {
        label: "Preferences",
        click: () => {
          win?.loadURL("http://localhost:3000/settings/preferences");
        },
      },
    ],
  };

  menu.append(new MenuItem(settingsMenu));

  Menu.setApplicationMenu(menu);

  nativeTheme.on("updated", () => {
    const newIsDarkMode = nativeTheme.shouldUseDarkColors;
    win?.webContents.send("theme-change", newIsDarkMode ? "dark" : "light");
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
