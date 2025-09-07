import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import INITIAL_STATE_WEATHER from '../../constans/initialStateWeather'
import * as API from '../../api/index'

const WEATHER_SLICE_NAME = 'weather'

export const getWeatherThunk = createAsyncThunk(
    `${WEATHER_SLICE_NAME}/getWeather`,
    async (payload, thunkAPI) => {
        try {
            const { data } = await API.getCurrentWeather()
            return data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)
const weatherSlice = createSlice({
    initialState: INITIAL_STATE_WEATHER,
    name: 'weatherInfo',
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getWeatherThunk.pending, state => {
            state.isFetching = true
            state.error = null
        })
        builder.addCase(getWeatherThunk.fulfilled, (state, { payload }) => {
            state.isFetching = false
            state.weatherData = payload
        })
        builder.addCase(getWeatherThunk.rejected, (state, { payload }) => {
            state.isFetching = false
            state.error = payload
        })
    },
})

const { reducer } = weatherSlice

export default reducer
