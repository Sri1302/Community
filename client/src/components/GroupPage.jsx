import { useUser } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from '../utils/api'
import {io} from 'socket.io-client'

//establish socket connection with the server
const socket = io.connect('http://localhost:3000')

export default function GroupPage(){
    const [msg,setMsg] = useState([])
    const {user} = useUser()
    const location = useLocation()
    const [members,setMembers] = useState([])
    const group = location.state
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState([])
    
    useEffect(()=>{
        async function getMembers(){
            const res = await axios.post('/api/groups/getGroupMembers',{groupId:group.grp._id})
            setMembers(res.data.members)
        }
        getMembers()
    },[])

    useEffect(()=>{
        //get all the messages
        const Messages = async ()=>{
            const res = await axios.post('/api/msg/getMessages',{groupId:group.grp._id})
            console.log(res.data)
            setMsg(res.data.messages)
        }
        Messages()

        socket.emit("join-group",{
            userId:user.fullName,
            groupId:group.grp._id
        })

        //get message from server
        socket.on("new-message",(message)=>{
            setMessages((prev)=>[...prev,message])
        })

        return ()=>{
            socket.off('join-group')//clears the event when the component unmounts
            socket.off("new-message")
        }
    },[])

    function handleClick(){
        socket.emit("send-message",{userId:user.fullName,groupId:group.grp._id,message:message})
        setMessage("")
    }

    const welcomeMsg = msg.filter((message)=>message.message.endsWith("group"))
    console.log(welcomeMsg)
    
    return <div> Community name:{group.grp.name}
    <br/>
   <p> {user.fullName} joined {group.grp.name}</p>
   <div style={{marginLeft:"1280px"}}>
   <p>List of user community</p>
   <h5>{group.grp.createdBy}  <span>(Admin)</span></h5>
   {members.map((member)=><h5>{member.userId}  <span>({member.role})</span></h5>)}
   </div>

   <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message" />
   <button onClick={handleClick}>Send</button>

   {msg.filter((message)=>!message.message.endsWith("group") ).map((msg)=><><h4>{msg.message}</h4><p>{msg.userId} {msg.createdAt}</p></>)}
   {messages.map((message)=><><h4>{message.message} </h4> <p>sent by {message.userId} </p></>)}
   
    </div>
}