import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating access and refresh tokens'
    )
  }
}

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

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existingUser._id
  )
  const signedInUser = await User.findById(existingUser._id).select(
    '-password  -refreshToken'
  )

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { signedInUser, accessToken, refreshToken },
        'Successfully Signed In'
      )
    )
})

const signOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  )
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  }
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'Signed Out Successfully'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Unauthorized request')
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken?._id)

    if (!user) {
      throw new ApiError(401, 'Invalid Refresh Token')
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or used')
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id)

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          'Access token refreshed'
        )
      )
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid Refresh Token')
  }
})

export { signUpUser, signInUser, signOutUser, refreshAccessToken }
