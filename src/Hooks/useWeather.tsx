import { format } from 'date-fns'
import { useEffect, useState } from 'react'

// https://openweathermap.org/api/one-call-api

interface Stats {
	loading: boolean
	description?: string
	temperature?: string
	humidity?: string
	rain?: string
	clouds?: string
	max?: string
	min?: string
	windSpeed?: string
	windGust?: string
	sunrise?: string
	sunset?: string
	icon?: string
}

const useWeather = () => {
	const [weather, setWeather] = useState<Stats>({
		loading: true,
		description: '--',
		temperature: '--',
		humidity: '--',
		rain: '--',
		clouds: '--',
		max: '--',
		min: '--',
		windSpeed: '--',
		windGust: '--',
		sunrise: '--',
		sunset: '--',
		icon: 'https://openweathermap.org/img/wn/01n@2x.png',
	})

	const ch = new Date().getHours()
	const isAfternoon = ch >= 12
	const isEvening = ch >= 17
	const isNight = ch > 22

	let tod = 'This morning'

	if (isAfternoon) tod = 'This afternoon'
	if (isEvening) tod = 'This evening'
	if (isNight) tod = 'Tonight'

	const FetchWeather = async (location: string) => {
		const API = `https://api.openweathermap.org/data/2.5/`
		const KEY = process.env.REACT_APP_WEATHER_KEY
		const url = `${API}onecall?${location}&units=imperial&exclude=minutely,hourly&appid=${KEY}`

		const response = await fetch(url)
		const res = await response.json()

		const description = tod + ' has ' + res.current.weather[0].description.toString()
		const temperature = Math.floor(res.current.feels_like).toString() + '°'
		const humidity = res.current.humidity.toString() + ' %'
		const rain = res.current.rain ? Math.ceil(res.current.rain).toString() : '0 %'
		const clouds = Math.ceil(res.current.clouds).toString() + ' %'
		const max = Math.ceil(res.daily[res.daily.length - 1].temp.max).toString() + '°'
		const min = Math.floor(res.daily[res.daily.length - 1].temp.min).toString() + '°'
		const windSpeed = res.current.wind_speed ? res.current.wind_speed.toFixed(1).toString() + ' mph' : '0 mph'
		const windGust = res.current.wind_gust ? res.current.wind_gust.toFixed(1).toString() + ' mph' : '0 mph'
		const sunrise = format(new Date(res.current.sunrise * 1000), 'p').toString()
		const sunset = format(new Date(res.current.sunset * 1000), 'p').toString()
		const icon = `https://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png`

		const stats = {
			loading: false,
			description, temperature,
			icon, max, min,
			humidity, rain, clouds,
			windSpeed, windGust,
			sunrise, sunset
		}
		setWeather(stats)
	}

	useEffect(() => {
		const useDynamicLocation = false

		if (useDynamicLocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const DYNAMIC_LOCATION = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
				FetchWeather(DYNAMIC_LOCATION)
			})
		} else {
			const HOME_LOCATION = `lat=33.368100&lon=-111.698180`
			FetchWeather(HOME_LOCATION)
		}
	}, [])

	return weather
}

export default useWeather