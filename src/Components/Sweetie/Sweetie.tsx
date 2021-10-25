import React, { useEffect } from 'react'

import DatetimeTile from './Tiles/DatetimeTile';
import WeatherTile from './Tiles/WeatherTile';
import CalendarTile from './Tiles/CalendarTile';
import GroceryTile from './Tiles/GroceryTile';
import CatTile from './Tiles/CatTile';

import '../../Styles/Sweetie/index.scss'
import '../../Styles/Sweetie/sweetie.scss'

const Sweetie: React.FC<any> = (props) => {
	const isProductionEnv = process.env.NODE_ENV === 'production'

	useEffect(() => {
		if (isProductionEnv) {
			document.getElementById('Sweetie')?.classList.add('Swt-vert')
			document.getElementById('Background')?.classList.add('Bg-vert')
		}

		setTimeout(() => {
			window.location.reload()
		}, 1200000)
	}, [])

	return (
		<>
			<div id="Sweetie">
				<Tile>
					<DatetimeTile state={props.state} />
				</Tile>
				<Tile>
					<CalendarTile state={props.state} />
				</Tile>
				<Tile>
					<WeatherTile state={props.state} />
				</Tile>
				<Tile>
					<CatTile state={props.state} />
				</Tile>
				<Tile>
					<GroceryTile state={props.state} />
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