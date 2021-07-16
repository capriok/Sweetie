import '../styles/weather.scss'
import useWeather from '../hooks/useWeather';

const Weather: React.FC = () => {
	const stats = useWeather()
	console.log(stats);

	return (
		<div className="weather">
			<div className="top">
				<h3 className="description">Today has {stats.description}</h3>
			</div>
			<div className="bottom">
				<div className="temperature">
					<p>{stats.temperature}<span className="symbol">°</span></p>
					<p>T</p>
				</div>
				<div className="icon"><img src={stats.icon} draggable={false} alt="" /></div>
				<div className="humidity">
					<p>{stats.humidity}<span className="symbol">%</span></p>
					<p>H</p>
				</div>
			</div>
		</div>
	)
}

export default Weather