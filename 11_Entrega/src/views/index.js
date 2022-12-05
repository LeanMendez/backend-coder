const socketClient = io();

//DOM manipulation
const name = document.getElementById('name')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnail')

const send = document.getElementById('sendItem')
const detail = document.getElementById('prodDetail')

//Envia la informacion del producto
if(send){
    send.addEventListener('click', ()=>{
        socketClient.emit('newProduct', {
            name: name.value,
            price: price.value,
            thumbnail: thumbnail.value
        })
    })

    //recibe los productos
    socketClient.on('list', (data) =>{
        let prod=''
        data.forEach(e => {
            prod += `<tr>
            <td>${e.name}</td>
            <td>${e.price}</td>
            <td><img src="${e.thumbnail}" alt="${e.name}"> </td>
            </tr>`
        });
        detail.innerHTML = prod
    })
}

// variables del chat
const historial = document.getElementById('historial')
const sendMsg = document.getElementById('sendMsg')
const msg = document.getElementById('msg')
let user,nombreUser,edad,alias,avatar

//DESNORMALIZAR
    //autor
    const authorSchema = new normalizr.schema.Entity('autor')
    //msg
    const msgSchema = new normalizr.schema.Entity('mensajes',{autor:authorSchema})
    //esquema chat
    const chatSchema = new normalizr.schema.Entity('chat',{
        mensajes:[msgSchema]
    },{idAttribute:'id'})


Swal.fire({
    title: 'Bienvenido/a',
    text:'Ingrese su Email',
    html: `<input type="text" id="email" class="swal2-input" placeholder="Correo" required>
    <input type="text" id="nombreUser" class="swal2-input" placeholder="Nombre" required>
    <input type="number" id="edad" class="swal2-input" placeholder="Edad" required>
    <input type="text" id="alias" class="swal2-input" placeholder="Alias" required>
    <input type="text" id="avatar" class="swal2-input" placeholder="Avatar" required>`,
    confirmButtonText: 'Continuar',
    allowOutsideClick: false,
    preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value;
        const nombreUser = Swal.getPopup().querySelector('#nombreUser').value;
        const alias = Swal.getPopup().querySelector("#alias").value;
        const edad = Swal.getPopup().querySelector("#edad").value;
        const avatar = Swal.getPopup().querySelector("#avatar").value;
        if (!email || !nombreUser || !alias || !edad||!avatar) {
            Swal.showValidationMessage(`complete el formulario`);
        }
        return { email, nombreUser, alias, edad, avatar}
    },
}).then(res=>{
    user = res.value.email
    nombreUser = res.value.nombreUser
    edad = res.value.edad
    alias = res.value.alias
    avatar = res.value.avatar

    return user,nombreUser,edad,alias,avatar
})

if(msg){
    sendMsg.addEventListener('click',(e) => {
        socketClient.emit('newMsgs',{
            id: user,
            nombre:nombreUser,
            edad:edad,
            alias:alias,
            avatar:avatar,
            texto: msg.value,
            hora: new Date()
        })
        msg.value=''
    })

    //recibe los msj
    socketClient.on('chat', async (data)=>{
        console.log(data);
        const normalData = await normalizr.denormalize(data.result,chatSchema,data.entities)
        console.log(normalData);
        let elemento = ''
        normalData.mensajes.forEach(e => {

            elemento += `<p class='text-success'><strong class='text-primary'>${e.autor.id}</strong> <strong class='text-danger'>${e.hora}</strong>: ${e.texto}</p>`
        });
        historial.innerHTML = elemento
    })
}