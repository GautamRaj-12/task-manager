import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { Task } from '../models/task.model.js'

const addTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, deadline } = req.body
  if (!title) throw new ApiError(400, 'Title is Required')
  if (!status) throw new ApiError(400, 'Status is Required')

  const createdTask = await Task.create({
    title,
    description,
    status,
    priority,
    deadline,
    createdBy: req.user._id,
  })

  if (!createdTask) {
    throw new ApiError(400, 'Could not create task due to some error!!!!!')
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { createdTask }, 'Add Task Route'))
})

const fetchSingleTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id

  const fetchedTask = await Task.findById(taskId)

  if (fetchedTask.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Unauthorized to view the Task')
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { fetchedTask }, 'Task fetched successfully'))
})

const fetchAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await Task.find()
  let userAllTasks = []
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].createdBy._id.toString() === req.user._id.toString()) {
      userAllTasks.push(allTasks[i])
    }
  }
  if (!userAllTasks) throw new ApiError(404, 'No Tasks found')
  return res
    .status(200)
    .json(
      new ApiResponse(200, { userAllTasks }, 'All tasks fetched successfully')
    )
})

const updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id
  const { title, description, status, priority, deadline } = req.body

  const task = await Task.findById(taskId)

  if (!task) {
    throw new ApiError(404, 'Task not found')
  }

  if (task.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Unauthorized to update the Task')
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description, status, priority, deadline },
    { new: true, runValidators: true }
  )

  return res
    .status(200)
    .json(new ApiResponse(200, { updatedTask }, 'Task updated successfully'))
})

const deleteSingleTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id
  const fetchedTask = await Task.findById(taskId)

  if (fetchedTask.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Unauthorized to delete the Task')
  }
  const deletedTask = await Task.deleteOne({ _id: taskId })
  return res
    .status(200)
    .json(new ApiResponse(200, { deletedTask }, 'Task Deleted'))
})

const deleteAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await Task.find({ createdBy: req.user._id })
  if (allTasks.length === 0) {
    throw new ApiError(404, 'No Tasks found')
  }
  const taskIds = allTasks.map((task) => task._id)
  const deletedTasks = await Task.deleteMany({ _id: { $in: taskIds } })
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCount: deletedTasks.deletedCount },
        'All tasks deleted successfully'
      )
    )
})

export {
  addTask,
  fetchSingleTask,
  fetchAllTasks,
  updateTask,
  deleteSingleTask,
  deleteAllTasks,
}
