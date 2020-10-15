const productForm = document.getElementById('productForm')

const remote = require('electron').remote

const app = remote.require('./app')


const productName = document.getElementById('name')
const productPrice = document.getElementById('price')
const productDescription = document.getElementById('description')
const productList = document.getElementById('products')

let products =  []

productForm.addEventListener('submit', async(e)=>{
    e.preventDefault() //Cancela el refresh por default que tienen los html al hacer submit
    
    const newProducto = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }
    const result = await app.createProduct(newProducto)
    console.log(result);
})

function renderProducts(products){
    productList.innerHTML = ''
    products.forEach(product=>{
        productList.innerHTML += 
        `
            <div class = "card card-body" my-2>
            <h4>${product.name}</h4>
            <p> ${product.description}</p>
            <h3>${product.name}</h3>

                <button class="btn btn-danger">
                    DELETE
                </button>

                <button class="btn btn-warning">
                    EDIT
                </button>

            </div>
        `
    })
}

const getProducts = async() =>{
    const results = await app.getProducts()
    
    renderProducts(results);
}

async function init(){
    products = await getProducts()
}

init()