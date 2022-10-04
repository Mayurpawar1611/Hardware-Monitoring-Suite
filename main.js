const electron = require('electron');
const url = require('url')
const path = require('path')
const {app, BrowserWindow} = electron;
const { ipcMain } = require('electron')
const fs = require('fs');

//importing functions
const sysMon = require('./sysMon.js')

let mainController;

app.on('ready', () => {

    mainController = new BrowserWindow({

    frame:true,
    width:1280,
    height:1080,
    minWidth:400,
    maxWidth:1920,
    minHeight:300,
    maxHeight:1080,
    backgroundColor: "#3c3c44",
    webPreferences:{
    nodeIntegration:true,
    contextIsolation:false,
    }
  });

    mainController.setMenu(null);
    mainController.webContents.openDevTools();

  //load HTML
  mainController.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));
});

sysMon();
