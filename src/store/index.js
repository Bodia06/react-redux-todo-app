import { configureStore } from '@reduxjs/toolkit'
import taksReducer from './slices/taskSlice'

const store = configureStore({reducer: {taskInfo: taksReducer}})

export default store