import React, { useEffect } from 'react'
import Swt from '../../Assets/swt.png'

import '../../Styles/Common/splash.scss'

const Splash: React.FC<any> = () => (
	<div className="splash">
		<img id="Swt-png" src={Swt} alt="" />
	</div>
)

export default Splash