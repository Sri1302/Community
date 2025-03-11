import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routers/user.router.js'
import groupRoutes from './routers/group.router.js'
import http from 'http'
import { Server } from 'socket.io'
import Message from './models/message.model.js'
import messageRoutes from './routers/message.router.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"https://community-frontend-eta.vercel.app",
        methods:["POST","GET","DELETE","PUT"]
    }
})

app.use('/api/user',userRoutes)
app.use('/api/groups',groupRoutes)
app.use('/api/msg',messageRoutes)

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`)

    socket.on("join-group",async ({userId,groupId})=>{
        socket.join(groupId)
        console.log(`${userId} joined ${groupId}`)

        //save the data to db
        const existingMsg = await Message.findOne({userId,groupId,message:`${userId} joined the group`})
        if(existingMsg){
            return io.to(groupId).emit("message",existingMsg)
        }
        const welcomeMsg = await Message.create({userId,groupId,message:`${userId} joined the group`})
        io.to(groupId).emit("message",welcomeMsg)
    })

    socket.on("send-message",async({userId,groupId,message})=>{
        //save message to db
        const newMessage =await Message.create({userId,groupId,message})

        //emit it to all the users
        io.to(groupId).emit("new-message",newMessage)
    })
})


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    server.listen(3000,()=>{
        console.log("listening from 3000 port")
    })
})
.catch((e)=>{
    console.log(e)
})