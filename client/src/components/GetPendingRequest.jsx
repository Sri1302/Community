import { useState,useEffect } from "react"
import axios from '../utils/api'
import { useUser } from "@clerk/clerk-react"

export default function GetPendingRequest(){
    const[requests,setRequests] = useState([])
    const {user} = useUser()

    useEffect(()=>{
        const pendingRequests = async ()=>{
          const res = await axios.get('/api/groups/pendingRequests')
          console.log(res.data)
          setRequests(res.data.pendingRequest)
        }
        pendingRequests()
      },[])

      async function accept(request){
        const res = await axios.post('/api/groups/approveRequest',{userId:request.userId,groupId:request.groupId,approve:true})
        const data = await res.data
        console.log(data)
        setRequests((requests)=>requests.filter((req)=>req.groupId!==request.groupId))
      }

    return <div><br/>Pending Requests...
        <br/>
        {requests.filter((req)=>req.userId!==user.fullName).map((request)=> request.status==="pending"?<>{request.userId} wants to join {request.groupName} <p><button onClick={()=>accept(request)}>Accept</button> <button>Reject</button></p></>: "No pending request man")}
    </div>
}