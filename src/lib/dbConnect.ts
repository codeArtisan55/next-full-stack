import mongoose from "mongoose"


type ConnectionObject ={
    isConnected?:number
}

interface Data{
    data?:Object | Array<Object> | string
}
const connection:ConnectionObject={}
const logs:Data={}

export async function dbConnect ():Promise<void>{

    if(connection.isConnected){
        console.log("database already connected");

        return
    }
    const db_uri=process.env.DB_URI
    if(!db_uri){
        throw new Error("DB_URI is not defined")
    }
    try {

        const db=await mongoose.connect(db_uri)
        logs.data=db.connections

        connection.isConnected=db.connections[0].readyState

    } catch (error) {
        console.log("database connection failed", error);
        process.exit(1)
    }

}
