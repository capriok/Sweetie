import React from 'react'
import useMultipleBackgrounds from '../../Hooks/useMultipleBackgrounds';

import DatetimeTile from './Tiles/DatetimeTile';
import WeatherTile from './Tiles/WeatherTile';
import CalendarTile from './Tiles/CalendarTile';
import CatTile from './Tiles/CatTile';
import GroceryTile from './Tiles/GroceryTile';
import CrimasTile from '../Crimas/CrimasTile';

import '../../Styles/index.scss'
import '../../Styles/Sweetie/sweetie.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const Sweetie: React.FC<Props> = (props) => {
	useMultipleBackgrounds()

	let isProd = process.env.NODE_ENV === 'production'
	const Swt_Orientation = isProd ? 'Sweetie-vert' : ''
	const Bg_Orientation = isProd ? 'Bg-vert' : ''

	return (
		<>
			<div id="Sweetie" className={Swt_Orientation}>
				<Tile>
					<DatetimeTile props={props} />
				</Tile>
				<Tile>
					<CalendarTile props={props} />
				</Tile>
				<Tile>
					<WeatherTile props={props} />
				</Tile>
				<Tile>
					<CatTile props={props} />
				</Tile>
				<Tile>
					{true
						? <CrimasTile props={props} />
						: <GroceryTile props={props} />
					}
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