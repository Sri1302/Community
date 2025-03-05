import { useUser } from "@clerk/clerk-react"
import { useLocation } from "react-router-dom"

export default function GroupPage(){
    const {user} = useUser()
    const location = useLocation()
    const group = location.state
    console.log(group)
    return <div> Community name:{group.grp.name}
    <br/>
   <p> {user.fullName} joined {group.grp.name}</p>
    </div>
}