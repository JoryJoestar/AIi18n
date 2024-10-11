const { app, BrowserWindow, ipcMain, ipcRenderer, dialog, session } = require('electron/main')
const path = require('node:path')
const treeKill = require('tree-kill');

const { translate } = require('./server.js');


let fastApiProcess = null


function startFastAPI() {

  const serverPath = process.platform === 'darwin' 
    ? path.join(__dirname, '../../build/backend/main/main') // macOS 可执行文件
    : path.join(__dirname, '../../build/backend/main/main.exe'); // Windows 可执行文件
  fastApiProcess = require('child_process').spawn(serverPath, { windowsHide: true });

  fastApiProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  fastApiProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  fastApiProcess.on('close', (code) => {
    console.log(`子进程退出，代码: ${code}`);
  });

}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280, // 设置窗口宽度
    height: 720, // 设置窗口高度
    minWidth: 800, // 设置最小宽度
    minHeight: 600, // 设置最小高度
    // icon: path.join(__dirname, '../icon/favicon@4x.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // 允许使用 Node.js
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
  ipcMain.handle('function:translate', translate);

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})