import { useEffect, useState } from "react"
import axios from '../utils/api'
import { useUser } from "@clerk/clerk-react"

export default function Users(){
    const [users,setUsers] = useState([])
    const {user} = useUser()
    useEffect(()=>{
        const getUsers = async ()=>{
            const res = await axios.get('/api/user/getUsers')
            const data = await res.data
            setUsers(data.users)
        }
        getUsers()
    },[])
    return <div>List of users:
        {users.filter((person)=>person.name!==user.fullName).map((user)=><><h4>username:{user.name}</h4>
        <p>email:{user.email}</p></>)}
    </div>
}