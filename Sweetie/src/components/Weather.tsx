import '../styles/weather.scss'
import useWeather from '../hooks/useWeather';
import { useEffect } from 'react';

const Weather: React.FC = () => {
	const stats = useWeather()

	useEffect(() => {
		console.log({ Weather: stats })
	}, [])

	const ch = new Date().getHours()
	const isAfternoon = ch >= 12
	const isEvening = ch >= 14
	const isNight = ch > 22

	let tod = 'This Morning'

	if (isAfternoon) tod = 'This afternoon'
	if (isEvening) tod = 'This evening'
	if (isNight) tod = 'Tonight'

	return (
		<div className="weather">
			<div className="top">
				<h1 className="description">{tod} has {stats.description}</h1>
			</div>
			<div className="bottom">
				<div className="temperature">
					<p>{stats.temperature}<span className="symbol">°</span></p>
					<label><p>Temperature</p></label>
				</div>
				<div className="icon"><img src={stats.icon} draggable={false} alt="" /></div>
				<div className="humidity">
					<p>{stats.humidity}<span className="symbol">%</span></p>
					<label><p>Humidity</p></label>
				</div>
			</div>
		</div>
	)
}

export default Weather
