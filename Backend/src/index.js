import bodyParser from "body-parser";
import db from "./db/db.js";
import express from 'express'
import User from "../models/user.models.js";
import personRouter from "./routes/personRoutes.js";
import userRouter from "./routes/userRoutes.js";


const app = express()
app.use(bodyParser.json())

// middleware function
const loqRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`)
    next();
}

app.use(loqRequest)
app.use('/person', personRouter)
app.use('/', userRouter)


app.listen(`${process.env.PORT}`, () => {
    console.log('Server listening on PORT ', `${process.env.PORT}`)
})


