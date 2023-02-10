import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import options from '../config/config.js'
import { logger, loggerFileError } from '../logger/logger.js'

let ContainerDaoProducts
let ContainerDaoCarts

let PersistenceDatabaseType = process.env.DATA_PERSISTENCE
// --------------------- HAY QUE USAR VARIABLES DE ENTORNO -----------------

switch (PersistenceDatabaseType) {
    case 'mongoDB':
        const mongoURI = process.env.MONGO_URI;   
// --------------------- HAY QUE USAR VARIABLES DE ENTORNO ----------------- 

        //Mongo connection
        mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, 
        (err) => {
            if(err) loggerFileError.error(`Connection failed - ${err}`)
            logger.info('Connected successfully to mongoDB');
        })

        const {productsSchema} = await import('../models/mongoDB/product.models.js')
        const {productsCollection} = await import('../models/mongoDB/product.models.js')
        const {ProductDaoMongoDB} = await import('./products/ProductDaoMongoDB.js')
        ContainerDaoProducts = new ProductDaoMongoDB(productsCollection, productsSchema)

        const {cartsSchema} = await import('../models/mongoDB/cart.models.js')
        const {cartsCollection} = await import('../models/mongoDB/cart.models.js')
        const {CartDaoMongoDB} = await import('./carts/CartDaoMongoDB.js')
        ContainerDaoCarts = new CartDaoMongoDB(cartsCollection, cartsSchema)

        break;
    case 'MariaDB':
        const {CartDaoMariaDB} = await import('./cart/CartDaoMariaDB.js')
        const {ProductDaoMariaDB} = await import('./products/ProductDaoMariaDB.js')
        ContainerDaoProducts = new ProductDaoMariaDB(options.mariaDB,'products')
        ContainerDaoCarts = new CartDaoMariaDB(options.mariaDB,'carts')
        break;
    case 'FileSystem':
        const CartDaoFyleSystem = await import('./carts/CartDaoFileSystem.js')
        const ProductDaoFyleSystem = await import('./products/ProductDaoFileSystem.js')
        logger.info(typeof(ProductDaoFyleSystem))
        ContainerDaoProducts = new ProductDaoFyleSystem(options.fileSystem.pathProd)
        ContainerDaoCarts = new CartDaoFyleSystem(options.fileSystem.pathCart)
        break;
}


export { ContainerDaoCarts, ContainerDaoProducts }