import { Router } from 'express'
import {
  addTask,
  deleteAllTasks,
  deleteSingleTask,
  fetchAllTasks,
  fetchSingleTask,
  updateTask,
} from '../controllers/task.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/add-task').post(verifyJWT, addTask)
router.route('/task/:id').get(verifyJWT, fetchSingleTask)
router.route('/all').get(verifyJWT, fetchAllTasks)
router.route('/task/update/:id').patch(verifyJWT, updateTask)
router.route('/task/delete/:id').delete(verifyJWT, deleteSingleTask)
router.route('/delete/all').delete(verifyJWT, deleteAllTasks)

export default router
