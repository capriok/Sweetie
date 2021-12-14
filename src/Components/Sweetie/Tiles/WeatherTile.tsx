import { useEffect } from 'react'
import useWeather from '../../../Hooks/useWeather'

import '../../../Styles/Sweetie/Tiles/weather-tile.scss'

interface Props {
	props: {
		socket: Socket
		state: SwtState
		dispatch: React.Dispatch<SwtAction>
	}
}

const WeatherTile: React.FC<Props> = () => {
	const stats = useWeather()

	useEffect(() => {
		!stats.loading && console.log({ Weather: stats })
	}, [stats])

	return (
		<div className="weather-tile">
			<div className="overview">
				<p className="description sub-title">{stats.description}</p>
				<br />
				<div className="temp">
					<span>{stats.temperature}</span>
				</div>
				<div className="visual">
					<div className="icon">
						<img src={stats.icon} draggable={false} alt="" />
					</div>
					<div className="min-max sub-title">
						<div>
							<span className="high">High: </span>
							<span className="max">{stats.max}</span>
						</div>
						<div>
							<span className="low">Low: </span>
							<span className="min">{stats.min}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="stats">
				<div className="line humidity">
					<label>Humidity: </label>
					<span>{stats.humidity}</span>
				</div>
				<div className="line rain">
					<label>Precipitation: </label>
					<span>{stats.rain}</span>
				</div>
				<div className="line cloudiness w-line">
					<label>Cloud Coverage: </label>
					<span>{stats.clouds}</span>
				</div>
				<div className="line windspeed">
					<label>Wind Speed: </label>
					<span>{stats.windSpeed}</span>
				</div>
				<div className="line windgust w-line">
					<label>Wind Gust: </label>
					<span>{stats.windGust}</span>
				</div>
				<div className="line sunrise">
					<label>Sunrise: </label>
					<span>{stats.sunrise}</span>
				</div>
				<div className="line sunset w-line">
					<label>Sunset: </label>
					<span>{stats.sunset}</span>
				</div>
			</div>
		</div>
	)
}

export default WeatherTile
