const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('node:path')
const { fetchWrapper } = require('./fetchApi.js'); // Adjust the path to your actual file
const treeKill = require('tree-kill');

const fastapiAppUrl = 'http://127.0.0.1:10000'


let fastApiProcess = null

function startFastAPI() {
  fastApiProcess = require('child_process').spawn(
    path.join(__dirname, '../../build/backend/main/main'), { windowsHide: true })
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1120, // 设置窗口宽度
    height: 800, // 设置窗口高度
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 允许使用 Node.js
      enableRemoteModule: true, // 允许使用远程模块
    }
  })
  mainWindow.setMenuBarVisibility(false)
  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../frontend/index.html'))
    startFastAPI()
  }

}

const stopFastAPI = () => {
  if (fastApiProcess !== null) {
    treeKill(fastApiProcess.pid)
    // fastApiProcess.kill()
    fastApiProcess = null
  }
}

app.on('before-quit', stopFastAPI)

app.whenReady().then(() => {
  ipcMain.handle("config:getBackendUrl", () => fastapiAppUrl);
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})