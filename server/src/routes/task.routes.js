import { Router } from 'express'
import {
  addTask,
  deleteAllTasks,
  deleteSingleTask,
  fetchAllTasks,
  fetchSingleTask,
  updateTask,
} from '../controllers/task.controller.js'

const router = Router()

router.route('/add-task').post(addTask)
router.route('/task/:id').get(fetchSingleTask)
router.route('/all').get(fetchAllTasks)
router.route('/task/update/:id').patch(updateTask)
router.route('/task/delete/:id').delete(deleteSingleTask)
router.route('/delete/all').delete(deleteAllTasks)

export default router
