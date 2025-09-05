import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getWeatherThunk } from '../store/slices/weatherSlices'

function Header({ error, isFetching, weatherData, getWeather }) {
    useEffect(() => {
        getWeather()
    }, [getWeather])

    const nowTemperature = weatherData?.hourly?.temperature_2m?.[0] ?? null
    const symbolTemperature = weatherData?.hourly_units?.temperature_2m ?? ''

    return (
        <div>
            {error && <div style={{ color: 'red' }}>Помилка: {error}</div>}
            {isFetching && <div>Завантаження...</div>}
            {!error && !isFetching && nowTemperature !== null && (
                <p>
                    Поточна температура: {nowTemperature} {symbolTemperature}
                </p>
            )}
        </div>
    )
}

const mapStateToProps = ({ weatherInfo }) => ({
    error: weatherInfo.error,
    isFetching: weatherInfo.isFetching,
    weatherData: weatherInfo.weatherData,
})

const mapDispatchToProps = (dispatch) => ({
    getWeather: () => dispatch(getWeatherThunk()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
