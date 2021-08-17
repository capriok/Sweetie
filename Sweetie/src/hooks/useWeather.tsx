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

	useEffect(() => {
		(async () => {
			const API = `https://api.openweathermap.org/data/2.5/`
			const LOCATION = `lat=32.301210&lon=-110.827220`
			const EXCLUDE = `minutely,hourly,daily`
			const KEY = process.env.REACT_APP_WEATHER_KEY
			const ENDPOINT = `${API}onecall?${LOCATION}&units=imperial&exclude=${EXCLUDE}&appid=${KEY}`

			const response = await fetch(ENDPOINT)
			const res = await response.json()

			const results = {
				loading: false,
				timezone: res.timezone.split('/')[1],
				temperature: Math.ceil(res.current.temp),
				humidity: res.current.humidity,
				description: res.current.weather[0].description,
				icon: `http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png`
			}
			setWeather(results)
		})()
	}, [])

	return weather
}

export default useWeather