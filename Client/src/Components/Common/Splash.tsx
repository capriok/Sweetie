import React from 'react'
import Swt from 'Assets/sweetie-icon.png'

import 'Styles/components/common/splash.scss'

const Splash: React.FC<any> = () => (
	<div id="Splash">
		<div className="splash-content">
			<img className="splash-icon" src={Swt} alt="" />
		</div>
	</div>
)

export default Splash