import React from 'react'
import Swt from '../../Assets/sweetie-icon.png'

import '../../Styles/Shared/splash.scss'

const Splash: React.FC<any> = () => {
	let isProd = process.env.NODE_ENV === 'production'
	let isSweetie = window.location.pathname === '/sweetie'

	const Splash_Orientation = isProd && isSweetie ? 'Splash-vert' : ''

	return (
		<div className="splash">
			<div id="Splash-content" className={Splash_Orientation}>
				<img id="Splash-icon" src={Swt} alt="" />
			</div>
			<div id="Splash-message"></div>
		</div>
	)
}

export default Splash