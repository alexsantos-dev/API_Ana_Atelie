import { Router } from 'express'
import UserController from '../controllers/User.controller.js'

const router = Router()

router.post('/users', UserController.createUser)
router.get('/users', UserController.findAllUsers)
router.get('/users/:id', UserController.findOneUser)

export default { router }