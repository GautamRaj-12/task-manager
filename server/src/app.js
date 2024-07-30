import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

//routes
import userRoutes from './routes/user.routes.js'
import taskRoutes from './routes/task.routes.js'
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tasks', taskRoutes)
export default app
