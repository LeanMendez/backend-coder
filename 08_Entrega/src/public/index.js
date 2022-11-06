const socketClient = io()

let userName;
Swal.fire({
    title:"Welcome",
    text:"insert your name",
    input:"text",
    customClass: {
        validationMessage: 'validation'
    },
    preConfirm: (value) => {
        if (!value) {
            Swal.showValidationMessage(
                '<i class="fa fa-info-circle"></i>required camp'
            )
        }
    },
    allowOutsideClick:false
}).then(respuesta=>{
    userName = respuesta.value;
    document.getElementById("userEmail").innerHTML = `<span>Welcome ${respuesta.value}</span>`;
});

//-----------------------------------------------------

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
    const response = await fetch("/tableTemplate.handlebars");
    const result = await response.text();
    const template = Handlebars.compile(result);
    const tableTemplate = template({productos:data});
    return tableTemplate;
}

//recibe la lista de productos
socketClient.on('products', async (data)=>{
    const htmlTable = await createTemplateTable(data);
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = htmlTable;
})



// variables del chat

socketClient.on("messages", async (dataMsg)=>{
    console.log(dataMsg)
    let messageElements = "";
    dataMsg.forEach(msg=>{
        messageElements += `<div><strong>${msg.user} - ${msg.timestamp}:</strong> ${msg.message}</div>`;
    })
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.innerHTML = dataMsg.length>0 ? messageElements : '';
})

//envio del mensaje del chat
const chatInput = document.getElementById("chatMsg");
const chatButton = document.getElementById("sendMsg");

chatButton.addEventListener("click",()=>{
    socketClient.emit("newMessage",{
        user:userName,
        timestamp: new Date().toLocaleString(),
        message: chatInput.value
    });
    chatInput.value = "";
})