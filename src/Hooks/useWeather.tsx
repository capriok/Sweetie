import { format } from 'date-fns'
import { useEffect, useState } from 'react'

// https://openweathermap.org/api/one-call-api

const useWeather = () => {
	const [weather, setWeather] = useState<any>({
		loading: true,
		timezone: 0,
		temperature: 0,
		humidity: 0,
		description: '',
		icon: ``
	})

	const FetchWeather = async (location: string) => {
		const API = `https://api.openweathermap.org/data/2.5/`
		const KEY = process.env.REACT_APP_WEATHER_KEY
		const url = `${API}onecall?${location}&units=imperial&exclude=minutely,hourly&appid=${KEY}`

		const response = await fetch(url)
		const res = await response.json()

		const results = {
			loading: false,
			description: res.current.weather[0].description,
			temperature: Math.floor(res.current.feels_like),
			humidity: res.current.humidity,
			rain: res.current.rain ? Math.ceil(res.current.rain) : 0,
			clouds: Math.ceil(res.current.clouds),
			max: Math.ceil(res.daily[res.daily.length - 1].temp.max),
			min: Math.floor(res.daily[res.daily.length - 1].temp.min),
			windSpeed: res.current.wind_speed.toFixed(1),
			windGust: res.current.wind_gust.toFixed(1),
			sunrise: format(new Date(res.current.sunrise * 1000), 'p'),
			sunset: format(new Date(res.current.sunset * 1000), 'p'), icon: `https://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png`
		}
		setWeather(results)
	}

	useEffect(() => {
		const useDynamicLocation = false

		if (useDynamicLocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const DYNAMIC_LOCATION = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
				FetchWeather(DYNAMIC_LOCATION)
			})
		} else {
			const HOME_LOCATION = `lat=32.301210&lon=-110.827220`
			FetchWeather(HOME_LOCATION)
		}
	}, [])


	return weather
}

export default useWeather