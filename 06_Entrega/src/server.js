const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const {engine} = require('express-handlebars')


const appRouter = require('./routes')
const Contenedor = require('./helpers/contenedor')
const addId = require('./helpers/addIdentificador')


//inicializacion de la app y instancia de contenedor
const service = new Contenedor('productos.txt')
const app = express()
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))


//routes
app.use('/', appRouter)

//configuracion de motor de plantillas
app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine','hbs')
app.set('views', path.join(__dirname,'views'))

const server = app.listen( 8080, ()=>{
    console.log(`Application running on http://localhost:${PORT}`)
})

//websockets
const io = new Server(server)
io.on("connection", async (socket) => {
    console.log(`Nuevo socket conectado con ID: ${socket.id}`);

    //carga de los productos
    socket.emit('products', await service.getAll() )

    //actualizacion de los productos en tiempo real
    socket.on('update', async(product)=> {
        const arrProductos = await service.getAll()
        await service.save({
            ...product, id: addId(arrProductos)
        })
        //envia la lista actualizada de productos a TODOS los sockets
        io.sockets.emit("products", await service.getAll())
    })
})

