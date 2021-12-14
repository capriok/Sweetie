import { useEffect, useState } from 'react'

import code from '../../Assets/code.png'
import '../../Styles/Crimas/CrimasTile.scss'

const CrimasTile: React.FC<{ state: SwtState }> = ({ state }) => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		setMessage(state.crimasMessage)
	}, [state.crimasMessage])

	return (
		<div className="crimas-tile">
			<div className="message">{message}</div>
			<img src={message} alt="" className="message" />
			<div className="prompts">
				<div className="top">
					<img className="qr" src={code} alt="" />
				</div>
				<div className="bot">GTMR?</div>
			</div>
		</div>
	)
}

export default CrimasTile
