const socketClient = io()

//manipulacion del DOM
const formProduct = document.getElementById('formProduct')
formProduct.addEventListener('submit', (e)=>{
    e.preventDefault()
    const newProduct = {
        title: document.getElementById('product-title').value,
        price: document.getElementById('product-price').value,
        thumbnail: document.getElementById('product-thumbnail').value,
    }
    //Envia el nuevo producto al server
    socketClient.emit('update', newProduct)
    formProduct.reset()
})
//funcion para pre-compilar un template en handlebars
const createTemplateTable = async(data) => {
    const response = await fetch("/tableTemplate.hbs");
    const result = await response.text();
    const template = Handlebars.compile(result);
    const tableTemplate = template({productos:data});
    return tableTemplate;
}

//recibe la lista de productos
socketClient.on('products', async (data)=>{
    console.log(data)
    const htmlTable = await createTemplateTable(data);
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = htmlTable;
})