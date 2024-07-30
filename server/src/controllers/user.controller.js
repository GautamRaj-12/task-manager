import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'

const signUpUser = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, {}, 'Sign Up'))
})

const signInUser = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(200, {}, 'Sign In'))
})

const signOutUser = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(200, {}, 'Sign Out'))
})

export { signUpUser, signInUser, signOutUser }
