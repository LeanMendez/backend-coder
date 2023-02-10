import knex from 'knex'


class ContainerSQL{
    constructor(options, tableName){
        this.database = knex(options)
        this.tableName = tableName

    }

    //METHODS
    async getAll(){
        try {
            const data = await this.database.from(this.tableName).select('*')
            const items = data.map(item=>({...item}))
            return items
        } catch (error) {
            return error
        }
    }

    async save(body){
        try {
            const data = {...body, timestamp: new Date.now()}
            const [id] = await this.database(this.table).insert(data)
            return logger.info(`item with ID:${id} saved successfully`)
        } catch (error) {
            return error
        }
    }

    async getById(id){
        try {
            const data = await this.database.from(this.tableName).where('id', id).select()
            const [item] = data.map(elem=>({...elem}))
            return item
        } catch (error) {
            return error
        }
    }
    
    async deleteById(id){
        try {
            await this.database.from(this.tableName).where('id', id).del()
            return logger.info(`item with ID: ${id} deleted from table: ${this.tableName}`)
        } catch (error) {
            return error
        }
    }

    async deleteAll(){
        try {
            await this.database.from(this.tableName).del()
            return logger.info(`All items from table: ${this.tableName} was deleted`)
        } catch (error) {
           return error 
        }
    }

    async updateById(id, body){
        try {
            await this.database.from(this.tableName).where('id', id).update({...body})
            return this.getById(id)
        } catch (error) {
            return error
        }
    }

}

export default ContainerSQL