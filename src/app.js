const {BrowserWindow, Notification} = require('electron')
const {getConnection} = require('./database')

async function createProduct(product){
    try {
        const con = await getConnection()

        product.price = parseFloat(product.price) //Transforma el precio a decimal
        const result = await con.query('INSERT INTO products SET ?', product)

        new Notification({
            title: 'Electron MySQL',
            body: 'New Product Saved Succesfully'
        }).show()

        product.id = result.insertId

        return product

    } catch (error) {
        console.log(error)    
    }
}

async function getProducts(){
    const con = await getConnection()

    const results = con.query('SELECT * FROM products')

    console.log(results)
    return results
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
    createProduct,
    getProducts
}