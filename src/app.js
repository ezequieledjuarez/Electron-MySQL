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

    const results = con.query('SELECT * FROM products ORDER BY id DESC')

    console.log(results)
    return results
}  

async function deleteProduct(id){
    const con = await getConnection()

    const result = await con.query('DELETE FROM products WHERE id = ?', id)

    console.log(result)

    return result
}

async function editProduct(id){

}

async function getProductById(id){
    const con = await getConnection()

    const result = await con.query('SELECT * FROM products WHERE id = ?', id)

    return result[0]
}

async function updateProduct(id, product){
    const con = await getConnection()

    const result = await con.query('UPDATE products SET ? WHERE id = ?', [product, id])

    console.log(result)
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
    getProducts,
    deleteProduct,
    getProductById,
    updateProduct
}