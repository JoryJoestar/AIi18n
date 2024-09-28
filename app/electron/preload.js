const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  translate: (body) => ipcRenderer.invoke("function:translate", body)
})