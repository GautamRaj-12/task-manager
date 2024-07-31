import { Router } from 'express'
import {
  signInUser,
  signOutUser,
  signUpUser,
} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/signup').post(signUpUser)
router.route('/signin').post(signInUser)
router.route('/signout').post(verifyJWT, signOutUser)

export default router
