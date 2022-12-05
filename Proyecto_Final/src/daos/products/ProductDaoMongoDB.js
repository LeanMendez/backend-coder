import ContainerMongoDB from '../../managers/ContainerMongoDB.js';


class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(Collection, Schema){
        super(Collection, Schema)
    }
}

export {ProductDaoMongoDB};