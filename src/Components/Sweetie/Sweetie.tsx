import React, { useEffect } from 'react'

import DateTime from './Tiles/DateTime';
import Weather from './Tiles/Weather';
import Calendar from './Tiles/Calendar';
import Groceries from './Tiles/Groceries';
import Cats from './Tiles/Cats';

import '../../Styles/Sweetie/index.scss'
import '../../Styles/Sweetie/sweetie.scss'

const Sweetie: React.FC<any> = () => {

	useEffect(() => {
		setTimeout(() => {
			window.location.reload()
		}, 300000)
	}, [])

	return (
		<>
			<div id="Sweetie">
				<Tile>
					<DateTime />
				</Tile>
				<Tile>
					<Calendar />
				</Tile>
				<Tile>
					<Weather />
				</Tile>
				<Tile>
					<Cats />
				</Tile>
				<Tile>
					<Groceries />
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