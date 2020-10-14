const productForm = document.getElementById('productForm')

const remote = require('electron').remote

const app = remote.require('./app')

app.hello()

const productName = document.getElementById('name')
const productPrice = document.getElementById('price')
const productDescription = document.getElementById('description')


productForm.addEventListener('submit', (e)=>{
    e.preventDefault() //Cancela el refresh por default que tienen los html al hacer submit
    
    const newProducto = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }
})