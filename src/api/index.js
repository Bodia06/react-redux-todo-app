import axios from 'axios'

const httpClient = axios.create({
    baseURL:
        'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&',
})

export const getCurrentWeather = () => httpClient.get('current=temperature_2m')
