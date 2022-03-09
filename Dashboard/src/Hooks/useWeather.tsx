import { useEffect, useState } from 'react'
import Api from 'api'

const useWeather = () => {
	const [weather, setWeather] = useState<any>({
		loading: true,
		current: {
			temperature: '--',
			rain: '--',
			clouds: '--',
			max: '--',
			min: '--',
			windSpeed: '--',
			windGust: '--',
			icon: 'https://openweathermap.org/img/wn/01n@2x.png',
		},
		hours: [
			{ time: '6 AM', temp: '--' },
			{ time: '8 AM', temp: '--' },
			{ time: '10 AM', temp: '--' },
			{ time: '12 PM', temp: '--' },
			{ time: '2 PM', temp: '--' },
			{ time: '4 PM', temp: '--' },
			{ time: '6 PM', temp: '--' },
			{ time: '8 PM', temp: '--' },
			{ time: '10 PM', temp: '--' },
		]
	})

	function GetWeather() {
		Api.GetWeatherStats().then(stats => {
			setWeather({
				loading: false,
				...stats
			})
		})
	}

	useEffect(() => {
		GetWeather()
		setInterval(() => {
			GetWeather()
		}, 1800000)
	}, [])

	return weather
}

export default useWeather