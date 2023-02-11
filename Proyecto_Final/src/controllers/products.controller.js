import addId from "../helpers/addIdentificador.js"
import { ContainerDaoProducts } from '../daos/index.js';
import { checkLogin } from "../middlewares/checkLogin.js";

const serviceProduct = ContainerDaoProducts

const getProducts =  async (req, res)=> {
    try {
        if(req.params.id !== undefined){
            const id = req.params.id
            const product = await serviceProduct.getById(id)
            if(!product){
                res.status(400).json({status: "FAILED", data: { error: `Product with ID: ${id} doesn't exist`}})
            }
            res.status(200).json(product)
        }else{
            const products = await serviceProduct.getAll()
            res.status(200).json({status: "OK", data: products})
        }
    } catch (err) {
        res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
    }
}

const saveProduct = async (req, res) => {
    try {
        const {nombre, descripcion, codigo, foto, precio, stock} = req.body
        if(!nombre || !descripcion || !codigo || !foto || !precio ){
            res.status(400).json({status: 'FAILED', data: {error: "One of the following keys is empty in req.body: nombre, descripcion, codigo, foto(url), precio, stock"}})
        }
        const productos = await serviceProduct.getAll();
        const newProduct = {
            id: addId(productos),
            name: nombre,
            description: descripcion,
            cod: codigo,
            thumbnail: foto,
            price: precio,
            stock,
            timestamp: Date.now()
        }
        await serviceProduct.save(newProduct)
        const createdProduct = await serviceProduct.getById(addId(productos))
        res.status(201).json({ status: "OK", data: createdProduct, message: "Product created successfully" })
    } catch (err) {
        res.status(err.status || 500).json({ status: "FAILED", data: { error: err?.message || err }})
    }
}

const updateProduct = async (req, res) =>{
    try {
        const id = parseInt(req.params.id)
        const product = await serviceProduct.getById(id)
        if(!product){
            res.status(400).json({status: "FAILED", data: { error: `Product with ID: ${id} doesn't exist`}})
        }
        const { body } = req
        //producto actualizado con los nuevos valores
        const updatedProduct = {
            ...product, ...body, timestamp: new Date()
        }
        await serviceProduct.updateById(id, updatedProduct)
        res.status(201).json({status: "OK", data: updatedProduct, message: "Product updated successfully" })
    } catch (err) {
        res.status(err.status || 500).json({ status: "FAILED", data: { error: err?.message || err }})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        logger.info(id)
        const product = await serviceProduct.getById(id)
        logger.info(product)
        if(!product){
            res.status(400).json({status: "FAILED", data: { error: `Product with ID: ${id} doesn't exist`}})
        }
        await serviceProduct.deleteById(id)
        res.status(200).json({status: "OK", message: `Product ID: ${id} was deleted successfully`})
    } catch (err) {
        res.status(err.status || 500).json({ status: "FAILED", data: { error: err?.message || err }})
    }
}

export {
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct,
    serviceProduct
}