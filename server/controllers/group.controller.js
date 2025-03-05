import Group from "../models/group.model.js"
import GroupMembers from "../models/groupmembership.model.js"

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
            return res.staus(200).json({msg:"Group not found"})
        }
        if(group.isPublic){
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

export {createGroup,getGroups,joinGroup}