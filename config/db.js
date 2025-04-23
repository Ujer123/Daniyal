import mongoose from "mongoose";

let isConnected = global.mongoose

if(!isConnected){
    isConnected = global.mongoose = {conn: null, promise: null}
}

async function dbConnect(){
    if(isConnected.conn){
        return isConnected.conn
    }

    if(!isConnected.promise){
        const opts = {
            bufferCommands: false
        }
        isConnected.promise = mongoose.connect(process.env.MONGODB_URI)
            .then((mongoose) => {
                return mongoose
            })
            .catch((err) => {
                console.error("MongoDB connection error:", err)
                throw err
            })
    }
    isConnected.conn = await isConnected.promise
    return isConnected.conn
}

export default dbConnect;