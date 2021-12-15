import { useEffect } from 'react'
import useWeather from '../../../Hooks/useWeather'

import {
	WiThermometer,
	WiThermometerExterior,

	WiHumidity,
	WiRain,
	WiCloudy,
	WiStrongWind,
	WiWindy,
	WiSunrise,
	WiSunset
} from 'react-icons/wi'

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
				<div className="top w-line">
					<p className="description sub-title">{stats.description}</p>
				</div>
				<div className="mid w-line">
					<div className="icon">
						<img src={stats.icon} draggable={false} alt="" />
					</div>
					<div className="temperature">
						<span>{stats.temperature}</span>
					</div>
				</div>
				<div className="bot w-line">
					<div className="line">
						<span className="icon high"><WiThermometer /></span>
						<span className="max sub-title">{stats.max}</span>
					</div>
					<div className="line">
						<div className="icon low"><WiThermometerExterior /></div>
						<span className="min sub-title">{stats.min}</span>
					</div>
				</div>
			</div>

			<div className="stats">
				<div className="top w-line">
					<div className="line rain">
						<div className="icon"><WiRain /></div>
						<span>{stats.rain}</span>
					</div>
					<div className="line cloudiness">
						<div className="icon"><WiCloudy /></div>
						<span>{stats.clouds}</span>
					</div>
				</div>
				<div className="mid w-line">
					<div className="line windspeed">
						<div className="icon"><WiStrongWind /></div>
						<span>{stats.windSpeed}</span>
					</div>
					<div className="line windgust">
						<div className="icon"><WiWindy /></div>
						<span>{stats.windGust}</span>
					</div>
				</div>
				<div className="bot w-line">
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
	)
}

export default WeatherTile
