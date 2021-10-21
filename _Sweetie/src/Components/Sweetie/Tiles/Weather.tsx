import { useEffect } from 'react'
import useWeather from '../../../Hooks/useWeather'

import '../../../Styles/Sweetie/Tiles/weather.scss'

const Weather: React.FC = () => {
	const stats = useWeather()

	useEffect(() => {
		!stats.loading && console.log({ Weather: stats })
	}, [stats])

	const ch = new Date().getHours()
	const isAfternoon = ch >= 12
	const isEvening = ch >= 17
	const isNight = ch > 22

	let tod = 'This morning'

	if (isAfternoon) tod = 'This afternoon'
	if (isEvening) tod = 'This evening'
	if (isNight) tod = 'Tonight'

	return (
		<div className="weather">
			{stats.loading
				? <p>Fetching Weather</p>
				: <>
					<div className="overview">
						<p className="description sub-title">{tod} has {stats.description}</p>
						<br />
						<div className="temp">
							<span>{stats.temperature}°</span>
						</div>
						<div className="visual">
							<div className="icon">
								<img src={stats.icon} draggable={false} alt="" />
							</div>
							<div className="min-max sub-title">
								<div>
									<span className="high">High: </span>
									<span className="max">{stats.max}°</span>
								</div>
								<div>
									<span className="low">Low: </span>
									<span className="min">{stats.min}°</span>
								</div>
							</div>
						</div>
					</div>
					<div className="stats">
						<div className="line humidity">
							<label>Humidity: </label>
							<span>{stats.humidity} %</span>
						</div>
						<div className="line rain">
							<label>Precipitation: </label>
							<span>{stats.rain} %</span>
						</div>
						<div className="line cloudiness w-line">
							<label>Cloud Coverage: </label>
							<span>{stats.clouds} %</span>
						</div>
						<div className="line windspeed">
							<label>Wind Speed: </label>
							<span>{stats.windSpeed} mph</span>
						</div>
						<div className="line windgust w-line">
							<label>Wind Gust: </label>
							<span>{stats.windGust} mph</span>
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
					{/* <p className="description">{tod} has {stats.description}</p>
					<div className="visual">
						<div className="icon">
							<img src={stats.icon} draggable={false} alt="" />
						</div>
						<div className="min-max">
							<div>
								<span className="high">High: </span>
								<span className="max">{stats.max}°</span>
							</div>
							<div>
								<span className="low">Low: </span>
								<span className="min">{stats.min}°</span>
							</div>
						</div>
					</div>
					<div className="line temperature">
						<label>Temperature: </label>
						<span>{stats.temperature}°</span>
					</div>
					<div className="line humidity">
						<label>Humidity: </label>
						<span>{stats.humidity} %</span>
					</div>
					<div className="line windspeed">
						<label>Wind Speed: </label>
						<span>{stats.windSpeed} mph</span>
					</div>
					<div className="line windgust">
						<label>Wind Gust: </label>
						<span>{stats.windGust} mph</span>
					</div>
					<div className="line sunrise">
						<label>Sunrise: </label>
						<span>{stats.sunrise}</span>
					</div>
					<div className="line sunset">
						<label>Sunset: </label>
						<span>{stats.sunset}</span>
					</div> */}
				</>
			}
		</div>
	)
}

export default Weather
