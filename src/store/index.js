import { configureStore } from '@reduxjs/toolkit'
import taksReducer from './slices/taskSlice'
import weatherReducer from './slices/weatherSlices'

const store = configureStore({
  reducer: { taskInfo: taksReducer, weatherInfo: weatherReducer }
})

export default store
