import { useUser } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from '../utils/api'

export default function GroupPage(){
    const {user} = useUser()
    const location = useLocation()
    const [members,setMembers] = useState([])
    const group = location.state
    console.log(group)

    useEffect(()=>{
        async function getMembers(){
            const res = await axios.post('/api/groups/getGroupMembers',{groupId:group.grp._id})
            setMembers(res.data.members)
        }
        getMembers()
    },[])

    function handleSubmit(e){
        e.preventDefault()
        console.log('Clciked')
    }
    return <div> Community name:{group.grp.name}
    <br/>
   <p> {user.fullName} joined {group.grp.name}</p>
   <div style={{marginLeft:"1280px"}}>
   <p>List of user community</p>
   <h5>{group.grp.createdBy}  <span>(Admin)</span></h5>
   {members.map((member)=><h5>{member.userId}  <span>({member.role})</span></h5>)}
   </div>

   <form onSubmit={handleSubmit}>
    <input type='text' placeholder="Type a message....."/>
    <button type="submit">Submit</button>
   </form>
    </div>
}