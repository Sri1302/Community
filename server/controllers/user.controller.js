import User from "../models/user.model.js"

const createUser = async (req,res)=>{
    try{
        const {email,name} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(200).json({msg:"User already exists"})
        
        const newUser = await User.create({email,name})
        res.status(200).json({msg:"User created Successfully",user:newUser})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

const getUsers = async (req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json({users:users})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
}

export {createUser,getUsers}