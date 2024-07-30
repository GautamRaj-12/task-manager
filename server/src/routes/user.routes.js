import { Router } from 'express'
import {
  signInUser,
  signOutUser,
  signUpUser,
} from '../controllers/user.controller.js'

const router = Router()

router.route('/signup').post(signUpUser)
router.route('/signin').post(signInUser)
router.route('/signout').post(signOutUser)

export default router
