import React from 'react'

import DatetimeTile from './Tiles/DatetimeTile';
import WeatherTile from './Tiles/WeatherTile';
import CalendarTile from './Tiles/CalendarTile';
import CatTile from './Tiles/CatTile';
import GroceryTile from './Tiles/GroceryTile';

import '../../Styles/index.scss'
import '../../Styles/Sweetie/Sweetie.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const Sweetie: React.FC<Props> = (props) => {

	let isProd = process.env.NODE_ENV === 'production'
	const Swt_Orientation = isProd ? 'Sweetie-vert' : ''
	const Bg_Orientation = isProd ? 'Bg-vert' : ''

	const tiles = [
		{ component: <DatetimeTile {...props} /> },
		{ component: <CalendarTile {...props} /> },
		{ component: <WeatherTile {...props} /> },
		{ component: <CatTile {...props} /> },
		{ component: <GroceryTile {...props} /> },
	]

	return (
		<>
			<div id="Sweetie" className={Swt_Orientation}>
				{tiles.map(({ component }, i) => (
					<div id="Tile">
						{component}
					</div>
				))}
			</div>
			<div id="Background" className={Bg_Orientation} />
		</>
	)
}

export default Sweetie
