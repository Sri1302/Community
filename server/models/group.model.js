import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    isPublic:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Group = mongoose.model("Group",groupSchema)

export default Group