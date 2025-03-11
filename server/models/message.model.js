import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Message = mongoose.model("Message",messageSchema)

export default Message