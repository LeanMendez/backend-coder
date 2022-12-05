import ContainerMongoDB from '../../managers/ContainerMongoDB.js';


class CartDaoMongoDB extends ContainerMongoDB{
    constructor(collection, schema){
        super(collection, schema)
    }
}

export {CartDaoMongoDB};