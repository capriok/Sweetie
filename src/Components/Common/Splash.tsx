import React from 'react'
import Swt from '../../Assets/swt.png'

import '../../Styles/Common/splash.scss'

const Splash: React.FC<any> = () => {
	return (
		<div className="splash">
			<img id="splash-swt" src={Swt} alt="" />
		</div>
	)
}

export default Splash