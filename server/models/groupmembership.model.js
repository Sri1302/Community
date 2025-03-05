import mongoose from "mongoose";

const groupMembership = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true
    },
    role:{
        type:String,
        enum:["admin","member"],
        required:true
    },
    joinedAt:{
        type:Date,
        default:Date.now
    }
})

const GroupMembers = mongoose.model("GroupMembers",groupMembership)

export default GroupMembers