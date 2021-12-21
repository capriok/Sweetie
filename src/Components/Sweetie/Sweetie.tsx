import React from 'react'

import DatetimeTile from './Tiles/DatetimeTile';
import WeatherTile from './Tiles/WeatherTile';
import CalendarTile from './Tiles/CalendarTile';
import CatTile from './Tiles/CatTile';
import GroceryTile from './Tiles/GroceryTile';

import '../../Styles/index.scss'
import '../../Styles/Sweetie/sweetie.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const Sweetie: React.FC<Props> = (props) => {
	// useMultipleBackgrounds()

	let isProd = process.env.NODE_ENV === 'production'
	const Swt_Orientation = isProd ? 'Sweetie-vert' : ''
	const Bg_Orientation = isProd ? 'Bg-vert' : ''

	return (
		<>
			<div id="Sweetie" className={Swt_Orientation}>
				<Tile>
					<DatetimeTile {...props} />
				</Tile>
				<Tile>
					<CalendarTile {...props} />
				</Tile>
				<Tile>
					<WeatherTile {...props} />
				</Tile>
				<Tile>
					<CatTile {...props} />
				</Tile>
				<Tile>
					<GroceryTile {...props} />
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