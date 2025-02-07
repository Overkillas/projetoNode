import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


async function databaseConnect() {
    mongoose.connect(process.env.DB_CONNECTION_STRNG);

    return mongoose.connection;
}

export default databaseConnect;


// process.env.DB_CONNECTION_STRNG

//"mongodb+srv://admin:admin123@cluster0.bhn3j.mongodb.net/GamesStore?retryWrites=true&w=majority&appName=Cluster0"