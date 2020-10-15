const productForm = document.getElementById('productForm')

const remote = require('electron').remote

const app = remote.require('./app')


const productName = document.getElementById('name')
const productPrice = document.getElementById('price')
const productDescription = document.getElementById('description')
const productList = document.getElementById('products')

let products =  []
let editingStatus = false
let editProductId

productForm.addEventListener('submit', async(e)=>{
    e.preventDefault() //Cancela el refresh por default que tienen los html al hacer submit
    
    const newProducto = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value
    }

    if(!editingStatus){
        const result = await app.createProduct(newProducto)
        console.log(result)
    } else{
        await app.updateProduct(editProductId, newProducto)
        editingStatus = false
        eidtProductId = ''
    }

    productForm.reset()
    productName.focus()

    getProducts()
})

async function deleteProduct(id){
 const response  = confirm('Are you sure you want to delete it?')
 if(response){
     await app.deleteProduct(id)
     await getProducts()
 }
 return

}

async function editProduct(id){
    const product = await app.getProductById(id)
    productName.value = product.name
    productPrice.value = product.price
    productDescription.value = product.description

    editingStatus = true
    editProductId = product.id
}

function renderProducts(products){
    productList.innerHTML = ''
    products.forEach(product=>{
        productList.innerHTML += 
        `
            <div class = "card card-body" my-2 "animate__animated animate__bounce">
            <h4>${product.name}</h4>
            <p> ${product.description}</p>
            <h3>${product.price}</h3>

                <button class="btn btn-danger" onclick = "deleteProduct('${product.id}')" >
                    DELETE
                </button>

                <button class="btn btn-warning" onclick = "editProduct('${product.id}')" >
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