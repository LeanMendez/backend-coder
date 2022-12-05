import ContainerSQL from '../../managers/ContainerSQL.js';

class CartDaoMariaDB extends ContainerSQL{
    constructor(options, table){
        super(options, table)
    }
}

export default CartDaoMariaDB;