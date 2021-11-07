import React, { useEffect } from 'react'

import DatetimeTile from './Tiles/DatetimeTile';
import WeatherTile from './Tiles/WeatherTile';
import CalendarTile from './Tiles/CalendarTile';
import GroceryTile from './Tiles/GroceryTile';
import CatTile from './Tiles/CatTile';

import '../../Styles/Sweetie/index.scss'
import '../../Styles/Sweetie/sweetie.scss'

const Sweetie: React.FC<any> = (props) => {
	let isProd = process.env.NODE_ENV === 'production'
	const Swt_Orientation = isProd ? 'Sweetie-vert' : ''
	const Bg_Orientation = isProd ? 'Bg-vert' : ''

	useEffect(() => {
		const bg = document.getElementById('Background')
		bg!.style.backgroundImage = `url("/bgs/${Math.floor((Math.random() * 9) + 1)}.jpg")`
	}, [])

	return (
		<>
			<div id="Sweetie" className={Swt_Orientation}>
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
			<div id="Background" className={Bg_Orientation} />
		</>
	)
}

export default Sweetie

const Tile: React.FC<any> = ({ children }) => (
	<div id="Tile">
		{children}
	</div>
)