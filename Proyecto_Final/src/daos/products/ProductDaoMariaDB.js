import ContainerSQL from '../../managers/ContainerSQL.js';

class ProductDaoMariaDB extends ContainerSQL{
    constructor(options, table){
        super(options, table)
    }
}

export default ProductDaoMariaDB;