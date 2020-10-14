const {BrowserWindow} = require('electron')

function hello(){
    console.log('Hello World');
}

let window

function createWindow(){
   window =  new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true, //Permite importar modulos de node
            enableRemoteModule: true
        }
    })
    window.loadFile('src/ui/index.html')
}

module.exports = {
    createWindow,
    hello
}