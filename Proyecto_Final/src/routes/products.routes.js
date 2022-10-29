import { Router } from 'express'
import { deleteProduct, getProducts, saveProduct, updateProduct } from '../controllers/products.controller.js';
import { isAdminVerif } from '../middlewares/auth.js';

const productRouter = Router()

productRouter.get('/:id?', getProducts)

productRouter.post('/', isAdminVerif , saveProduct)

productRouter.put('/:id', isAdminVerif , updateProduct)

productRouter.delete('/:id', isAdminVerif , deleteProduct)

export {productRouter}