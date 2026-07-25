import mongoose from "mongoose";

export async function connectDB()
{
    try {
        const mongoUri = process.env.MONGO_URI

        if(!mongoUri)
        {
            throw new Error("the mongo DB is not connected")
        }

        const conn = await mongoose.connect(mongoUri)
        console.log("Mongo DB connected : ",conn.connection.host)
    } catch (error) {
        console.error("Mongo DB connection error : ",error.message);
        process.exit(1)
    }
}