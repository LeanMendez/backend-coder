
const ContenedorSql = require( '../helpers/contenedorSql')
const options = require('../config/databaseConfig')
const express = require('express')
const appRouter = express.Router()

const serviceProducts = new ContenedorSql(options.mariaDB, 'products')
//rutas
appRouter.get('/', async (req,res) => {
    const productos= await serviceProducts.getAll()
    res.render('home', {productos})
})

appRouter.get('/:id', async (req,res) => {
    const productId = req.params.id
    const product = await serviceProducts.getById(parseInt(productId))
    if(product){
        return res.send(product)
    }else{
    res.send({error: `Product with ID ${productId} doesn't exist`})
    }
})

appRouter.post('/', async(req,res) => {
    const {body} = req;
    await serviceProducts.save(body);
    res.status(201).redirect('/');
})

appRouter.put('/:id',async(req,res)=>{
    const updateData = req.body;
    const productId = req.params.id;
    const result = await serviceProducts.updateById(parseInt(productId),updateData);
    res.status(201).send(result);
})

appRouter.delete('/:id',async(req,res)=>{
    const productId = req.params.id;
    const result = await serviceProducts.deleteById(parseInt(productId));
    res.status(200).send(result);
})

module.exports = {appRouter};