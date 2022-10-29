import addId from "../helpers/addIdentificador.js"
import Contenedor from '../helpers/contenedor.js';
import { serviceProduct } from "./products.controller.js";

const serviceCart = new Contenedor('carrito.txt')

const createCart = async(req, res) =>{
    try {
        const carts = await serviceCart.getAll()
        const newCart = {
            id: addId(carts),
            productos:[],
            timestamp: Date.now()
        }
        serviceCart.save(newCart)
        res.status(201).json({status: 'OK', data:{id: newCart.id, message: `Cart with ID: ${newCart.id} created successfully`}})
    } catch (err) {
        res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
    }
}

const deleteCart = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const cart = await serviceCart.getById(id)
        if(!cart){
            res.status(400).json({status: "FAILED", data: { error: `Cart with ID: ${id} doesn't exist`}})
        }
        await serviceCart.deleteById(id)
        res.status(200).json({status: 'OK', data:{ message: `Cart with ID: ${req.params.id} deleted successfully`}})
    } catch (error) {
        res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}}) 
    }
}

const getCartProducts = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        const cart = await serviceCart.getById(id)
        const arrProductos = cart.productos
        res.status(200).json(arrProductos)
    } catch (err) {
        res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
    }
}

const addProductToCart = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const cart = await serviceCart.getById(id)
        const productId = parseInt(req.body.id)
        const product = await serviceProduct.getById(productId)
        await cart.productos.push(product)
        const updatedCart = await serviceCart.updateById(id, cart)
        res.status(201).json({status: "OK", data: updatedCart, message: `Cart's products updated successfully, added product ID: ${productId}` })
    } catch (err) {
        res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const id_prod = parseInt(req.params.id_prod)
        const cart = await serviceCart.getById(id)
        const cartProductsUpdated = cart.productos.filter(prod => prod.id !== id_prod)
        const newCart = {...cart, productos: cartProductsUpdated}
        await serviceCart.updateById(id, newCart );
        res.status(200).json({status: "OK", message: `Cart's products updated, product ID: ${id_prod} was deleted successfully` })
    } catch (err) {
        res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
    }
}

export {
    createCart,
    deleteCart,
    getCartProducts,
    addProductToCart,
    deleteProductFromCart
}