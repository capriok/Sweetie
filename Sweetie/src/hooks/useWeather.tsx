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
		const url = `${API}onecall?${location}&units=imperial&exclude=minutely,hourly,daily&appid=${KEY}`

		const response = await fetch(url)
		const res = await response.json()

		const results = {
			loading: false,
			timezone: res.timezone.split('/')[1],
			temperature: Math.ceil(res.current.temp),
			humidity: res.current.humidity,
			description: res.current.weather[0].description,
			icon: `https://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png`
		}
		setWeather(results)
	}

	useEffect(() => {
		const useDynamicLocation = false

		if (useDynamicLocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
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