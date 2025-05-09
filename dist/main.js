import { app, BrowserWindow, Menu, MenuItem } from "electron";
let win = null;
function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            contextIsolation: true,
        },
    });
    win.loadURL("http://localhost:3000");
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
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});
