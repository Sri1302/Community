import express from 'express'
import { createGroup,getGroups,joinGroup,joinRequest,approveRequest,pendingRequests,getGroupMembers } from '../controllers/group.controller.js'

const router = express.Router()

router.post('/createGroup',createGroup)
router.get('/getGroups',getGroups)
router.post('/joinGroup',joinGroup)//public group
router.post('/joinRequest',joinRequest)//private groups
router.get('/pendingRequests',pendingRequests)
router.post('/approveRequest',approveRequest)
router.post('/getGroupMembers',getGroupMembers)

export default router