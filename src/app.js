const {BrowserWindow} = require('electron')

let window

function createWindow(){
   window =  new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true //Permite importar modulos de node
        }
    })
    window.loadFile('src/ui/index.html')
}

module.exports = {
    createWindow
}