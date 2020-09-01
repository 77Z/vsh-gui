const {app, BrowserWindow} = require("electron");

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        height: 450,
        width: 800,
        frame: true,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true,
        minHeight: 450,
        minWidth: 800,
        resizable: false
    });

    mainWindow.loadURL(`file://${__dirname}/dom/index.html`);
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if (mainWindow === null) createWindow();
});
