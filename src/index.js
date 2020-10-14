const {createWindow} = require('./app')
const {app} = require('electron')

app.whenReady()
.then(createWindow)

