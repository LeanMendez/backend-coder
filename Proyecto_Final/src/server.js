import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { productRouter } from './routes/products.routes.js';
import { cartRouter } from './routes/cart.routes.js';
import { isImplemented } from './middlewares/routes404.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//inicializacion de la app
const PORT = process.env.PORT || 8080
const app = express()

//middelwares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))

//routes
app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)
app.use('*', isImplemented)


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})