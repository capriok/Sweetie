import React from 'react'

import DatetimeTile from './Tiles/Datetime';
import WeatherTile from './Tiles/Weather';
import CalendarTile from './Tiles/Calendar';
import CatsTile from './Tiles/Cats';
import GroceryTile from './Tiles/Grocery';

import 'Styles/index.scss'
import 'Styles/Sweetie/sweetie.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const Sweetie: React.FC<Props> = (props) => {

	let isProd = process.env.NODE_ENV === 'production'
	const Swt_Orientation = isProd ? 'Sweetie-vert' : ''

	const tiles = [
		{ component: <DatetimeTile {...props} /> },
		{ component: <CalendarTile {...props} /> },
		{ component: <WeatherTile {...props} /> },
		{ component: <CatsTile {...props} /> },
		{ component: <GroceryTile {...props} /> },
	]

	return (
		<div id="Sweetie" className={Swt_Orientation}>
			{tiles.map(({ component }, i) => (
				<div id="Tile" key={i}>
					{component}
				</div>
			))}
		</div>
	)
}

export default Sweetie
