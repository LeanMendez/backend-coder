import { Context, helpers, MongoClient, config, ObjectId } from "../depts.ts";
import {User, UserInput} from "../model/dbModels/user.ts";


const {MONGO_URI} = config();

//conexion con mongo
const client = new MongoClient();
try {
    await client.connect(MONGO_URI);
    console.log("conexion exitosa a la base de datos")
} catch (error) {
    console.log(`Hubo un error al conectar a la base de datos ${error}`);
}

// const userCollection="users";
// const userModel = mongoose.model(userCollection,userSchema);

const db = client.database("denoDB");
const userModel = db.collection("users");

export const findUserAll = async(ctx:Context)=>{
    try {
        const users = await userModel.find().toArray();
        ctx.response.status=200;
        ctx.response.body={data:users}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = {message:`hubo un error ${error.message}`} //res.json
    }
}

export const findUserById = async(ctx:Context)=>{
    try {
        const {id} = helpers.getQuery(ctx,{mergeParams:true});//req.params;
        const user = await userModel.findOne({_id: new ObjectId(id)});
        ctx.response.body = {data:user}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = {message:`hubo un error ${error.message}`}
    }
}

export const createUser = async(ctx:Context)=>{
    try {
        const body: UserInput = await ctx.request.body().value;//req.body
        await userModel.insertOne(body);
        ctx.response.status = 200;
        ctx.response.body={data:"user created"}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = {message:`hubo un error ${error.message}`} //res.json
    }
}