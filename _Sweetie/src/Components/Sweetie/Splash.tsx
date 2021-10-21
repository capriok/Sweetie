import React from 'react'
import Swt from '../assets/swt.png'

import '../styles/splash.scss'

const Splash: React.FC<any> = () => {
	return (
		<div className="splash">
			<div className="swt-cont">
				<img id="splash-swt" src={Swt} alt="" />
			</div>
			<div className="splash-bg" />
		</div>
	)
}

export default Splash