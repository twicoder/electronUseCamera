const electron = require('electron')

const images = require('./images')
const menuTemplate = require('./menu')

const { app, BrowserWindow, Menu, ipcMain: ipc } = electron

let mainWindow = null

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: false
    })

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.webContents.openDevTools()
    
    images.mkdir(images.getPicturesDir(app))

    mainWindow.on('closed', _ => {
        mainWindow = null
    })

    const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
    Menu.setApplicationMenu(menuContents)
})

ipc.on('image-captured', (evt, contents) => {
    images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
        images.cache(imgPath)
    })
})

ipc.on('image-remove', (evt, index) => {
    images.rm(index, _ => {
        evt.sender.send('image-removed', index)
    })
})

ipc.on('image-removed', (evt, index) => {
    document.getElementById('photos').removeChild(Array.from(document.querySelectorAll('.photo')))
})