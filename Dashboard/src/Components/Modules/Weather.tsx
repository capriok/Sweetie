import { useEffect } from 'react'
import useWeather from 'Hooks/useWeather'

import {
	WiThermometer,
	WiThermometerExterior,
	WiRain,
	WiCloudy,
	WiStrongWind,
	WiWindy,
	WiSunrise,
	WiSunset
} from 'react-icons/wi'

import 'Styles/modules/weather.scss'

interface Props {
	state: SwtState
}

const WeatherModule: React.FC<Props> = () => {
	const stats = useWeather()

	useEffect(() => {
		!stats.loading && console.log({ Weather: stats })
	}, [stats])

	return (
		<div className="weather-module">
			<div className="module-cont">

				<div className="overview">
					<div className="top _underline">
						<p className="description _module-title">{stats.description}</p>
					</div>
					<div className="mid _underline">
						<div className="icon">
							<img src={stats.icon} draggable={false} alt="" />
						</div>
						<div className="temperature">
							<span>{stats.temperature}</span>
						</div>
					</div>
					<div className="bot _underline">
						<div className="line">
							<span className="icon high"><WiThermometer /></span>
							<span className="max">{stats.max}</span>
						</div>
						<div className="line">
							<div className="icon low"><WiThermometerExterior /></div>
							<span className="min">{stats.min}</span>
						</div>
					</div>
				</div>

				<div className="stats">
					<div className="top _underline">
						<div className="line rain">
							<div className="icon"><WiRain /></div>
							<span>{stats.rain}</span>
						</div>
						<div className="line cloudiness">
							<div className="icon"><WiCloudy /></div>
							<span>{stats.clouds}</span>
						</div>
					</div>
					<div className="mid _underline">
						<div className="line windspeed">
							<div className="icon"><WiStrongWind /></div>
							<span>{stats.windSpeed}</span>
						</div>
						<div className="line windgust">
							<div className="icon"><WiWindy /></div>
							<span>{stats.windGust}</span>
						</div>
					</div>
					<div className="bot _underline">
						<div className="line sunrise">
							<div className="icon"><WiSunrise /></div>
							<span>{stats.sunrise}</span>
						</div>
						<div className="line sunset">
							<div className="icon"><WiSunset /></div>
							<span>{stats.sunset}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WeatherModule
