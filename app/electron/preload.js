const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  getBackendUrl: () => ipcRenderer.invoke("config:getBackendUrl")
})