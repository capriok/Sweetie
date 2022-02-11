import { useEffect, useState } from 'react'
import Api from 'api'

const useWeather = () => {
	const [weather, setWeather] = useState<any>({
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

	function GetWeather() {
		Api.GetWeatherStats().then(stats => {
			setWeather(stats)
		})
	}

	useEffect(() => {
		GetWeather()
		setTimeout(() => {
			GetWeather()
		}, 600000)
	}, [])

	return weather
}

export default useWeather