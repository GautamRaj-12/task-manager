import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'

const signUpUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email && !password) {
    throw new ApiError(400, 'Email and Password both are required')
  }
  if (password.length < 6 || password.length > 60) {
    throw new ApiError(400, 'Password should be between 6 and 60 characters')
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new ApiError(409, 'User already exists')
  }
  const createdUser = await User.create({ email, password })

  if (!createdUser) {
    throw new ApiError(500, 'Some error occurred while registering!!!!!!')
  }

  const signedUpUser = await User.findById(createdUser._id).select('-password')
  return res
    .status(201)
    .json(
      new ApiResponse(201, { signedUpUser }, 'User Registration is Complete')
    )
})

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email && !password) {
    throw new ApiError(400, 'Email and Password both are required')
  }
  const existingUser = await User.findOne({ email })
  if (!existingUser) {
    throw new ApiError(400, 'User with this email does not exist')
  }

  const isPasswordValid = await existingUser.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid Password')
  }

  const signedInUser = await User.findById(existingUser._id).select('-password')
  return res
    .status(201)
    .json(new ApiResponse(200, { signedInUser }, 'Successfully Signed In'))
})

const signOutUser = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(200, {}, 'Sign Out'))
})

export { signUpUser, signInUser, signOutUser }
