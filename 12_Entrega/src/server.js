import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import { normalize, schema } from "normalizr";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { router } from './routes/route.js';
import { options } from './config/config.js';
import { ContainerFileSystem } from './managers/ContainerFileSystem.js';
import { ContainerMariaDb } from './managers/ContainerMariaDB.js';



//declaracion de variables globales
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//instancia de servicios
const serviceChat = new ContainerFileSystem(options.fileSystem.path)
const serviceProduct = new ContainerMariaDb(options.mariaDb)



const app = express()
const PORT = process.env.PORT || 8080;
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/views')))
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://LeanMendez:1tRaGxQFCagXphqA@coder.vwm9zrq.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    secret: "claveUltraSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}))

//motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'handlebars')

//router
app.use('/api', router)

//Normalizacion de la data
    //autor
const authorSchema = new schema.Entity('autor')
    //msg
const msgSchema = new schema.Entity('mensajes',{autor:authorSchema})
    //esquema chat
const chatSchema = new schema.Entity('chat',{
    mensajes:[msgSchema]
},{idAttribute:'id'})

//aplico normalizacion
const DataNormalize = (data)=>{
    const normalizacion = normalize({id:'historial', mensajes:data},chatSchema)
    return normalizacion
}

const NormalizeMsg = async()=>{
    const resultado = await serviceChat.getAll()
    const mensajesNormalizados = DataNormalize(resultado)
    //console.log(JSON.stringify(mensajesNormalizados, null,"\t"))
    return mensajesNormalizados
}
NormalizeMsg()

//instancia del server
const server = app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})

//websockets
const io = new Server(server)

io.on('connection', async(socket)=>{
    console.log('se conecto un nuevo cliente', socket.id)

    socket.on('newProduct', async(newProduct)=>{
        await serviceProduct.save(newProduct)
        io.sockets.emit('list', productos)
    })

    //Emisor de chat
    io.sockets.emit('chat', await NormalizeMsg())

    socket.broadcast.emit('nuevoUsuario')

    socket.on('newMsgs', async(newMsgs)=>{
        await serviceChat.save(newMsgs)
        console.log(newMsgs)
        io.sockets.emit('chat', await NormalizeMsg())
    })

})