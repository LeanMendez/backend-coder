const knex = require('knex')

class ContenedorSql {
    constructor(options, tableName){
        this.database = knex(options);
        this.tableName = tableName
    }

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

            
            const [id] = await this.database(this.tableName).insert({
                time: new Date().toLocaleString(),
                user: body.user,
                mensaje: body.mensaje,
            });
            const msj = await this.getById(id)
            return msj
            //await this.database.from(this.tableName).insert(producto);
            //console.log(await this.getAll())
            //console.log(`data with ID: ${id} saved`)
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
            return console.log(`data with ID: ${id} deleted from table: ${this.tableName}`)
        } catch (error) {
            return error
        }
    }

    async deleteAll(){
        try {
            await this.database.from(this.tableName).del()
            return console.log(`All data from table: ${this.tableName} was deleted`)
        } catch (error) {
            
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

module.exports = ContenedorSql;