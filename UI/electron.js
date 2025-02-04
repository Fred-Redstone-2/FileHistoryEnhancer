const electron = require('electron');
const {app, BrowserWindow} = electron
const url = require('url')
const path = require('path');
try {
  require("./server")  
} catch (e) {
  console.log(e)
}


//require('electron-reload')(__dirname,{electron: path.join(__dirname, 'node_modules', '.bin', 'electron')})

let windowObj = null

function createWindow(){
  windowObj = new BrowserWindow({
    width: 1025,
    height: 576,
    alwaysOnTop: false,
    maximizable: false,
    minimizable: false,
    center: true,
    autoHideMenuBar: true,
    resizable: false,
    fullscreenable: false,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true
  });
  windowObj.loadURL(url.format(path.join(__dirname, 'index.html')));
  windowObj.on('closed', () => {
    windowObj = null
  })


  //Workaround for frame top-bar glitch (electron 25)
  windowObj.on('blur', () => {
    windowObj.setBackgroundColor('#00000000')
  })
  
  windowObj.on('focus', () => {
    windowObj.setBackgroundColor('#00000000')
  })
  const [w, h] = windowObj.getSize();
  windowObj.setSize(w, h);
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('ready', createWindow);
