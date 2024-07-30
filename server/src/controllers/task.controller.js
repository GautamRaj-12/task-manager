import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { Task } from '../models/task.model.js'

const addTask = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, 'Add Task Route'))
})

const fetchSingleTask = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Fetch Single Task Route'))
})

const fetchAllTasks = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, 'Fetch All Tasks Route'))
})

const updateTask = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, 'Update Task Route'))
})

const deleteSingleTask = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Delete Single Task Route'))
})
const deleteAllTasks = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Delete All Tasks Route'))
})

export {
  addTask,
  fetchSingleTask,
  fetchAllTasks,
  updateTask,
  deleteSingleTask,
  deleteAllTasks,
}
