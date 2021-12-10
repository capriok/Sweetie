import React from 'react'
import Swt from '../../Assets/swt.png'

import '../../Styles/Common/splash.scss'

const Splash: React.FC<any> = () => {
	let isProd = process.env.NODE_ENV === 'production'
	let isSweetie = window.location.pathname === '/sweetie'

	const Splash_Orientation = isProd && isSweetie ? 'Splash-vert' : ''

	return (
		<div id="Splash">
			<div id="Splash-content" className={Splash_Orientation}>
				<img className="splash-icon" src={Swt} alt="" />
			</div>
		</div>
	)
}

export default Splash