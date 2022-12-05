import express from "express";

import { productosTest } from "../mocks/productMocks.js"
import { ContainerFileSystem } from '../managers/ContainerFileSystem.js';
import { ContainerMariaDb } from '../managers/ContainerMariaDB.js';
import { options } from "../config/config.js";

//instancia del router
const router = express.Router()

//instancia de los servicios
const serviceChat = new ContainerFileSystem(options.fileSystem.path)
const serviceProduct = new ContainerMariaDb(options.mariaDb, 'products')


//Rutas de productos
router.get('/', async(req, res)=>{
    res.render('products')
})

router.get('/productos', async(req, res)=>{
    const data = await serviceProduct.getAll()
    res.status(200).send(data)
})

router.get('/productos/:id', async(req, res)=>{
    const {id} = req.params
    const product = await serviceProduct.getById(id)
    if(product){
        console.log(product)
        res.status(200).json(product)
    }else{
        res.status(404).json({error: `item with ID: ${id} doesnt exist`})
    }
})

router.post('/', async(req, res)=>{
    const newData = req.body
    await serviceProduct.save(newData)
    const result = await serviceProduct.getAll()
    res.status(201).send(result)
})

router.put('/productos/:id', async(req, res)=>{
    const updateData = req.body
    const {id} = req.params
    const itemToUpdate = await serviceProduct.getById(id)
    if(!itemToUpdate){
        res.status(404).json({ error: `item with ID: ${id} doesnt exist`})
    }else{
        const updatedProduct = await serviceProduct.updateById(id, updateData)
        res.status(201).send(updatedProduct)
    }
})

router.delete('/', async(req, res)=>{
    const {id} = req.params
    const itemToDelete = await serviceProduct.getById(id)
    if(!itemToDelete){
        res.status(404).json({ error: `item with ID: ${id} already doesnt exist`})
    }else{
        await serviceProduct.deleteById(id)
        res.status(200).json({message: `item with ID: ${id} deleted`})
    }
})

//rutas del chat
router.get('/chat', async(req, res)=>{
    const data = await serviceChat.getAll()
    res.render('chat', {data})
})

router.post('/chat', async(req, res)=>{
    const newMsg = req.body;
    await serviceChat.save(newMsg)
    res.status(201).json({message: `message sent`})
})


//rutas de testeo con FAKER
router.get('/productos-test', async(req, res)=>{
    res.send(productosTest)
})

export {router}