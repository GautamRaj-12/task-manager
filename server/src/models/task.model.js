import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['To Do', 'In Progress', 'Under Review', 'Completed'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'Urgent'],
    },
    deadline: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

export const Task = mongoose.model('Task', taskSchema)
