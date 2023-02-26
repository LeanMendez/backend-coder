
import { ContainerDaoUser } from "../dao/index.js";

export const root = {
    getUsers : async()=>{
        const data = await ContainerDaoUser.getAll();
        return data
    },
    getUserById: async({id})=>{
        const data = await ContainerDaoUser.getById(id);
        return data
    },
    saveUser: async({user})=>{
        return await ContainerDaoUser.save(user)
    },
    deleteUserById: async({id})=>{
        return await ContainerDaoUser.deleteById(id)
    }
}