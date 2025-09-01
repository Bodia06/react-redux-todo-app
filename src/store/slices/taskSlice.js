import { createSlice } from '@reduxjs/toolkit'
import INITIAL_STATE_TASK from '../../constans/initialStateTask'
import { v4 as uuidv4 } from 'uuid';

const taskSlice = createSlice({
  name: "taskInfo",
  initialState: INITIAL_STATE_TASK,
  reducers: {
    addTask: ({ tasks }, { payload }) => {
      tasks.push({ ...payload, id: uuidv4(), completed: false });
    },    
    removeTask: ({tasks}, { payload }) => {
      const index = tasks.findIndex(task => task.id === payload)
      if (index !== -1) tasks.splice(index, 1)
    },
    editTask: ({tasks}, { payload }) => {
      const task = tasks.find(t => t.id === payload.id)
      if (task) {
        task.name = payload.name
        task.lastDateToRealization = payload.lastDateToRealization
      }
    },
    complatedTask: ({ tasks }, { payload }) => {
      const task = tasks.find(t => t.id === payload);
      if (task) task.completed = !task.completed; // виправлено
    }
    
  }
})

const {reducer, actions} = taskSlice
export const { addTask, removeTask, editTask, complatedTask } = actions
export default reducer
