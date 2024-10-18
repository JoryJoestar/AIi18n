const { app, BrowserWindow, ipcMain, ipcRenderer, dialog, session } = require('electron/main')
const path = require('node:path')
const treeKill = require('tree-kill');
const { translate } = require('./server.js');
const { spawn, exec } = require('child_process');

let fastApiProcess = null
let mainWindow = null
function startFastAPI() {
  const serverPath = path.join(__dirname, '../../build/backend/main/main')
  fastApiProcess = spawn(serverPath)
  fastApiProcess.stdout.on('data', (data) => {
    mainWindow.webContents.send('fastapi-status', { status:'success', stdout: data.toLocaleString() });
  });
  fastApiProcess.stderr.on('data', (data) => {
    mainWindow.webContents.send('fastapi-status', { status:'error', stderr: data.toLocaleString()});
  });
  fastApiProcess.on('spawn', () => {
    mainWindow.webContents.send('fastapi-status', { status: 'running', serverPath: serverPath });
  });

  // exec(serverPath, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`执行错误: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });
}

function createWindow() {
  mainWindow = new BrowserWindow({
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
    mainWindow.openDevTools();
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