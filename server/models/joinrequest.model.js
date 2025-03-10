import mongoose from 'mongoose'

const joinRequest = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    requestedAt:{
        type:Date,
        default:Date.now
    },
    groupName:{
        type:String,
        required:true
    }
})

const JoinRequest = mongoose.model("JoinRequest",joinRequest)

export default JoinRequest