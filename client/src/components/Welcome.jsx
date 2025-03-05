import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const { user } = useUser();

  useEffect(()=>{
    const getGroups = async ()=>{
      const res = await axios.get('/api/groups/getGroups')
      console.log(res.data)
      setGroups(res.data.groups)
    }
    getGroups()
  },[])

  function joinGroup(grp){
    const onBoard = async ()=>{
      const res = await axios.post('/api/groups/joinGroup',{userId:user.fullName,groupId:grp._id})
      console.log(res.data)
      navigate('/groupPage',{state:{grp}})
    }
    onBoard()
  }
  return (
    <div>
      Welcome,{user.fullName}
      <button onClick={() => navigate("/users")}>Users</button>
      <br />
      <br />
      List of private and public Groups
      <br/>
      {groups.filter((group)=>group.createdBy!==user.fullName).map((grp)=>grp.isPublic?<><br/>{grp.name} <p>created by {grp.createdBy}</p><button onClick={()=>joinGroup(grp)}>Join Group</button></>:<>{grp.name}<p>created by {grp.createdBy}</p><button>Request to Join </button></>)}
      <br />
      <br />
      <button onClick={()=>navigate('/createGroup')}>Create Group</button>
    </div>
  );
}
