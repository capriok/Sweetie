import { useEffect } from 'react'
import useWeather from 'Hooks/useWeather'

import {
	WiRain,
	WiCloudy,
	WiStrongWind,
	WiWindy,
} from 'react-icons/wi'

import 'Styles/modules/weather.scss'

interface Props {
	state: SwtState
}

const WeatherModule: React.FC<Props> = () => {
	const stats = useWeather()

	useEffect(() => {
		console.log({ Weather: stats })
	}, [stats])

	return (
		<div className="weather-module">
			<div className="module-cont">
				<div className="information">
					<div className="information-icon">
						<img src={stats.current.icon} draggable={false} alt="" />
					</div>
					<div className="left">
						<div className="info">
							<span className="label icon"><WiCloudy /></span>
							<span className="stat">{stats.current.clouds}</span>
						</div>
						<div className="info">
							<span className="label icon"><WiRain /></span>
							<span className="stat">{stats.current.rain}</span>
						</div>
					</div>
					<div className="middle">
						<div className="info">
							<span className="label">L</span>
							<span className="stat">{stats.current.min}</span>
						</div>
						<div className="temperature">
							<span>{stats.current.temperature}</span>
						</div>
						<div className="info">
							<span className="label">H</span>
							<span className="stat">{stats.current.max}</span>
						</div>
					</div>
					<div className="right">
						<div className="info">
							<span className="label icon"><WiStrongWind /></span>
							<span className="stat">{stats.current.windSpeed}</span>
						</div>
						<div className="info">
							<span className="label icon"><WiWindy /></span>
							<span className="stat">{stats.current.windGust}</span>
						</div>
					</div>
				</div>

				<div className="day-overview">
					{stats.hours.map((hour: any, i: number) =>
						<div key={i} className="interval">
							<span className="label">{hour.time}</span>
							<span className="stat">{hour.temp}</span>
						</div>)}
				</div>
			</div>
		</div>
	)
}

export default WeatherModule
