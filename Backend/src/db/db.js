import mongoose from "mongoose";

// mongodb uri
const mongoURI = `${process.env.MONGODB_URI}`

// sets up mongodb connection
mongoose.connect(mongoURI)

// maintains a default connection object representing mongoose connection
const db = mongoose.connection

// event listeners
db.on('connected',()=>{
    console.log("DB is connected!")
})

db.on('disconnected',()=>{
    console.log("DB is disconnected!")
})

db.on('error',()=>{
    console.log("DB connection error!")
})


export default db;
