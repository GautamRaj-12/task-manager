import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { Task } from '../models/task.model.js'

const addTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline, createdBy } = req.body
  if (!title) throw new ApiError(400, 'Title is Required')
  if (!status) throw new ApiError(400, 'Status is Required')

  const createdTask = await Task.create({
    title,
    description,
    status,
    priority,
    deadline,
    createdBy,
  })
  return res
    .status(200)
    .json(new ApiResponse(200, { createdTask }, 'Add Task Route'))
})

const fetchSingleTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id
  const fetchedPost = await Task.findById(taskId)
  return res
    .status(200)
    .json(new ApiResponse(200, { fetchedPost }, 'Task fetched successfully'))
})

const fetchAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await Task.find()
  return res
    .status(200)
    .json(new ApiResponse(200, { allTasks }, 'All tasks fetched successfully'))
})

const updateTask = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, {}, 'Update Task Route'))
})

const deleteSingleTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id
  const deletedTask = await Task.deleteOne({ _id: taskId })
  return res
    .status(200)
    .json(new ApiResponse(200, { deletedTask }, 'Task Deleted'))
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
