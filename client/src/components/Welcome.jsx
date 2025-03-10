import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [requests,setRequests] = useState([])
  const { user } = useUser();

  //create User
  useEffect(()=>{
    const createUser= async ()=>{
      const res = await axios.post('/api/user/createUser',{name:user.fullName,email:user.primaryEmailAddress.emailAddress})
      console.log(res.data)
    }
    createUser()
  },[])

  //get Pending Requests
  useEffect(()=>{
    const pendingRequest = async ()=>{
      const res = await axios.get('/api/groups/pendingRequests')
      console.log(res.data)
      setRequests(res.data.pendingRequest)
    }
    pendingRequest()
  },[])

  //get user groups
  useEffect(()=>{
    const getGroups = async ()=>{
      const res = await axios.get('/api/groups/getGroups')
      console.log(res.data)
      setGroups(res.data.groups)
    }
    getGroups()
  },[])
  
  async function RequestToJoin(grp){
    const res = await axios.post('/api/groups/joinRequest',{userId:user.fullName,groupId:grp._id,groupName:grp.name})
    console.log(res.data)
  }
  
  function joinGroup(grp){
    const onBoard = async ()=>{
      const res = await axios.post('/api/groups/joinGroup',{userId:user.fullName,groupId:grp._id})
      console.log(res.data)
      navigate('/groupPage',{state:{grp}})
    }
    onBoard()
  }

  async function joinTheGroup(grp){
    const res = await axios.post('/api/groups/joinGroup',{userId:user.fullName,groupId:grp._id})
    console.log(res.data)
    navigate('/groupPage',{state:{grp}})
  }

  
  return (
    <div>
      Welcome,{user.fullName}
      <button onClick={() => navigate("/users")}>Users</button>
      <br />
      <br />
      List of private and public Groups
      <br/>
      {groups.filter((group)=>group.createdBy!==user.fullName).map((grp)=>grp.isPublic?<><br/>{grp.name} <p>created by {grp.createdBy}</p><button onClick={()=>joinGroup(grp)}>Join Group</button></>:  <><br/>{grp.name}<p>created by {grp.createdBy}</p><button onClick={()=>RequestToJoin(grp)}>Request to Join </button></>)}
      <br />
      <br />
      <button onClick={()=>navigate('/getPendingRequests')}>Pending Requests</button>
      <br/>
      <br/>
      <button onClick={()=>navigate('/createGroup')}>Create Group</button>
    </div>
  );
}
