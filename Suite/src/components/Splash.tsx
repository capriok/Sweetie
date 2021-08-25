import React from 'react'
import Swt from '../assets/swt.jpg'

import '../styles/splash.scss'

const Splash: React.FC<any> = () => {
	return (
		<div className="splash">
			<img id="splash-swt" src={Swt} alt="" />
		</div>
	)
}

export default Splash