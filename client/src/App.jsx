import { SignedIn,SignedOut,UserButton } from "@clerk/clerk-react"
import { Route, Routes } from "react-router-dom"
import Welcome from "./components/Welcome"
import Home from "./components/Home"
import Users from "./components/Users"
import CreateGroup from "./components/CreateGroup"
import GroupPage from "./components/GroupPage"
import GetPendingRequest from "./components/GetPendingRequest"


export default function App(){
  return <div>
    <SignedIn>
      <UserButton/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/createGroup" element={<CreateGroup/>} />
        <Route path="/groupPage" element={<GroupPage/>} />
        <Route path="/getPendingRequests" element={<GetPendingRequest/>} />
      </Routes>
    </SignedIn>
    <SignedOut>
      <Routes>
      <Route path="/" element={<Home/>}/>
      </Routes>
    </SignedOut>
    
  </div>
}