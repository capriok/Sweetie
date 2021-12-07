import React from 'react'
import useMultipleBackgrounds from '../../Hooks/useMultipleBackgrounds';

import DatetimeTile from './Tiles/DatetimeTile';
import WeatherTile from './Tiles/WeatherTile';
import CalendarTile from './Tiles/CalendarTile';
import CatTile from './Tiles/CatTile';
import GroceryTile from './Tiles/GroceryTile';
import CrimasTile from './Tiles/CrimasTile';

import '../../Styles/index.scss'
import '../../Styles/Sweetie/sweetie.scss'

const Sweetie: React.FC<any> = (props) => {
	useMultipleBackgrounds()

	let isPartyDay = new Date().getMonth() === 11 && new Date().getDate() === 18
	let isProd = process.env.NODE_ENV === 'production'
	const Swt_Orientation = isProd ? 'Sweetie-vert' : ''
	const Bg_Orientation = isProd ? 'Bg-vert' : ''

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
					{(() => {
						if (isPartyDay)
							return <CrimasTile state={props.state} />
						else
							return <GroceryTile state={props.state} />
					})()}
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