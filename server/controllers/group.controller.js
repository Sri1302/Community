import Group from "../models/group.model.js"
import GroupMembers from "../models/groupmembership.model.js"
import JoinRequest from "../models/joinrequest.model.js"

const createGroup = async (req,res)=>{
    try{
        const {name,description,createdBy,isPublic} = req.body
        const group = await Group.create({name,description,createdBy,isPublic})
        res.status(200).json({msg:"Created group succesfully",group:group})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

const getGroups = async (req,res)=>{
    try{
        const groups = await Group.find()
        res.status(200).json({groups:groups})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }

}

const joinGroup = async (req,res)=>{
    try{
        const {userId,groupId} = req.body
        const group = await Group.findById(groupId)
        if(!group){
            return res.status(200).json({msg:"Group not found"})
        }
        if(group.isPublic || !group.isPublic){
            const existingMember= await GroupMembers.findOne({userId,groupId})
            if(existingMember){
                return res.status(200).json({msg:"User Already part of the group"})
            }
            const newMember = await GroupMembers.create({userId,groupId,role:"member"})
            return res.status(200).json({msg:"Joined Group Succesfully"})
        }
        return res.status(200).json({msg:"cannot directly join private groups"})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

const joinRequest = async (req,res)=>{
    const {userId,groupId,groupName} = req.body
    const group = await Group.findById(groupId)
    if(!group){
        return res.status(200).json({msg:"Group not found"})
    }

    if(group.isPublic){
        return res.status(200).json({msg:"Can directly join public groups"})
    }

    const existingRequest = await JoinRequest.findOne({userId,groupId,status:{$in:["pending","approved"]}})
    if(existingRequest){
        return res.status(200).json({msg:"Request already sent"})
    }

    const newRequest = await JoinRequest.create({userId,groupId,groupName,status:"pending"})
    res.status(200).json({msg:"Request sent successfully"})

}

const pendingRequests = async (req,res)=>{
    try{
        const pendingRequest = await JoinRequest.find()
        res.status(200).json({pendingRequest:pendingRequest})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

const approveRequest = async (req,res)=>{
    try{
        const {userId,groupId,approve}= req.body
        
        const group = await Group.findById(groupId)
        if(!group){
            return res.status(200).json({msg:"Group not found"})
        }
        //check if requester is admin

        const request = await JoinRequest.findOne({groupId})
        if(!request){
            return res.status(200).json({msg:"No pending Requests"})
        }
        if(approve){
            const members = await GroupMembers.create({userId,groupId,role:"member"})
            request.status="approved"
            await request.save()
            res.status(200).json({msg:"Joined group"})
        }
        else{
            request.status="rejected"
            await request.save()
            res.status(200).json({msg:"Request Rejected"})
        }
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

const getGroupMembers = async (req,res)=>{
    try{
        const {groupId} = req.body
        const members =await GroupMembers.find({groupId})
        res.status(200).json({members:members})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

export {createGroup,getGroups,joinGroup,joinRequest,pendingRequests,approveRequest,getGroupMembers}