import mongoose from "mongoose"

class ContainerMongoDB {
    constructor(Collection, Schema){
        this.model = mongoose.model(Collection, Schema)
        this.Collection = Collection
    }


    //METHODS
    async save(body){
        try {
           const newItem = await this.model.create(data)
           return newItem
        } catch (error) {
            return error
        }
    }
    async getAll(){
        try {
            const data = await this.model.find()
            return data
        } catch (error) {
            return error
        }
    }
    async getById(id){
        try {
            const data = await this.model.findById(id)
            return data
        } catch (error) {
            return error
        }
    }
    async deleteById(id){
        try {
            const data = await this.model.findByIdAndDelete(id)
            return data
        } catch (error) {
            return error
        }
    }
    async deleteAll(){
        try {
            await this.model.deleteMany()
            return console.log(`All the items from collection: ${this.Collection} were deleted`)
        } catch (error) {
         
        }
    }
    async updateById(id, body){
        try {
            await this.model.findByIdAndUpdate(id, body)
            const updatedItem = await this.getById(id)
            return updatedItem
        } catch (error) {
            return error
        }
    }
}

export default ContainerMongoDB;