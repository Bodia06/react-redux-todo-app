import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_STATE_TASK = {
    tasks: [
        {
            id: uuidv4(),
            name: 'Stend up',
            lastDateToRealization: new Date().toISOString().split('T')[0],
            complated: false,
        },
    ],
    filter: 'all',
    orderBy: 'none',
}

const taskSlice = createSlice({
    name: 'taskInfo',
    initialState: INITIAL_STATE_TASK,
    reducers: {
        addTask: (state, { payload }) => {
            state.tasks.push({
                ...payload,
                id: uuidv4(),
                completed: false,
            })
        },
        removeTask: (state, { payload }) => {
            state.tasks = state.tasks.filter(task => task.id !== payload)
        },
        editTask: (state, { payload }) => {
            const task = state.tasks.find(t => t.id === payload.id)
            if (task) {
                task.name = payload.name
                task.lastDateToRealization = payload.lastDateToRealization
            }
        },
        complatedTask: (state, { payload }) => {
            const task = state.tasks.find(t => t.id === payload)
            if (task) task.completed = !task.completed
        },
        setFilter: (state, { payload }) => {
            state.filter = payload
        },
        setOrderBy: (state, { payload }) => {
            state.orderBy = payload
        },
    },
})

const { reducer, actions } = taskSlice
export const {
    addTask,
    removeTask,
    editTask,
    complatedTask,
    setFilter,
    setOrderBy,
} = actions
export default reducer
