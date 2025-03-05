import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routers/user.router.js'
import groupRoutes from './routers/group.router.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user',userRoutes)
app.use('/api/groups',groupRoutes)


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(3000,()=>{
        console.log("listening from 3000 port")
    })
})
.catch((e)=>{
    console.log(e)
})