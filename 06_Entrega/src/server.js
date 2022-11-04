const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')

const { appRouter } = require('./routes')
const ContenedorProducts = require('./helpers/contenedorProducts')
const ContenedorChat = require('./helpers/contenedorChat')
const addId = require('./helpers/addIdentificador')


//service
const serviceProducts = new ContenedorProducts('productos.txt')
const serviceChat = new ContenedorChat('mensajes.txt')

//server
const app = express()
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/api', appRouter)

//configuracion de motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('view engine','handlebars')
app.set('views', path.join(__dirname,'views'))

const server = app.listen( 8080, async ()=>{
    console.log(`Application running on http://localhost:${PORT}`)
})

//websockets
const io = new Server(server)

//websockets config
io.on("connection", async (socket) => {
    console.log(`Nuevo socket conectado con ID: ${socket.id}`);
    //carga de los productos
    io.sockets.emit('products', await serviceProducts.getAll() )

    //actualizacion de los productos en tiempo real
    socket.on('update', async(product)=> {
        const arrProductos = await serviceProducts.getAll()
        await serviceProducts.save({
            ...product, id: addId(arrProductos)
        })
        //envia la lista actualizada de productos a TODOS los sockets
        io.sockets.emit("products", await serviceProducts.getAll())
    })
    
    //chat
    //Envio de todos los mensajes al socket que se conecta.
    io.sockets.emit("messages", await serviceChat.getAll());

     //agregar los mensajes del usuario y lo guardamos en el txt
    socket.on("newMessage",async(newMsg)=>{
        await serviceChat.save(newMsg);
        io.sockets.emit("messages", await serviceChat.getAll());
    })
})
