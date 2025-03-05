import express from 'express'
import { createGroup,getGroups,joinGroup } from '../controllers/group.controller.js'

const router = express.Router()

router.post('/createGroup',createGroup)
router.get('/getGroups',getGroups)
router.post('/joinGroup',joinGroup)

export default router