import Message from '../models/message.model.js'

const getMessages = async (req,res)=>{
    try{
        const {groupId} = req.body
        const messages = await Message.find({groupId})
        res.status(200).json({messages:messages})
    }
    catch(e){
        res.status(200).json({error:e.msg})
    }
}

export {getMessages}