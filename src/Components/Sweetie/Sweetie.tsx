import React, { useEffect } from 'react'
import useNodeEnvEffects from '../../Hooks/useNodeEnvEffects';

import DatetimeTile from './Tiles/DatetimeTile';
import WeatherTile from './Tiles/WeatherTile';
import CalendarTile from './Tiles/CalendarTile';
import GroceryTile from './Tiles/GroceryTile';
import CatTile from './Tiles/CatTile';

import '../../Styles/Sweetie/index.scss'
import '../../Styles/Sweetie/sweetie.scss'

const Sweetie: React.FC<any> = () => {
	useNodeEnvEffects()

	useEffect(() => {
		setTimeout(() => {
			window.location.reload()
		}, 1200000)
	}, [])

	return (
		<>
			<div id="Sweetie">
				<Tile>
					<DatetimeTile />
				</Tile>
				<Tile>
					<CalendarTile />
				</Tile>
				<Tile>
					<WeatherTile />
				</Tile>
				<Tile>
					<CatTile />
				</Tile>
				<Tile>
					<GroceryTile />
				</Tile>
			</div>
			<div id="Background"></div>
		</>
	)
}

export default Sweetie

const Tile: React.FC<any> = ({ children }) => (
	<div id="Tile">
		{children}
	</div>
)