import { useState } from "react"
import axios from '../utils/api'
import { useUser } from "@clerk/clerk-react"

export default function CreateGroup(){
    const {user} = useUser()
    const [form,setForm] = useState({
        name:"",
        description:"",
        isPublic:false
    })
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const createGroup = async ()=>{
            const res = await axios.post('/api/groups/createGroup',{name:form.name,description:form.description,isPublic:form.isPublic,createdBy:user.fullName})
            const data = await res.data
            console.log(data)
            setForm({name:"",description:"",isPublic:false})
        }
        createGroup()
    }
    

    return <div>
        <form onSubmit={handleSubmit}>
           <input type="text" value={form.name} placeholder="Group name" onChange={(e)=>setForm({...form,name:e.target.value})} />
           <textarea type='text' value={form.description} placeholder="Group Description" onChange={(e)=>setForm({...form,description:e.target.value})} />
            <input type="checkbox" checked={form.isPublic} onChange={(e)=>setForm({...form,isPublic:e.target.checked})} />
            <button type="submit">Create Group</button>
        </form>
    </div>
}