import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(3000,()=>{
        console.log("listening from 3000 port")
    })
})
.catch((e)=>{
    console.log(e)
})