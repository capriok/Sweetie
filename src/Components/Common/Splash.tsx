import React from 'react'
import Swt from '../../Assets/swt.png'

import '../../Styles/Common/splash.scss'

const Splash: React.FC<any> = () => {
	let isProd = process.env.NODE_ENV === 'production'
	let isSuite = window.innerWidth < 500

	const Splash_Orientation = isProd && !isSuite ? 'Splash-vert' : ''

	return (
		<div id="Splash">
			<div id="Splash-content" className={Splash_Orientation}>
				<img className="splash-icon" src={Swt} alt="" />
			</div>
		</div>
	)
}

export default Splash