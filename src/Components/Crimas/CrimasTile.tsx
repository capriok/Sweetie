import { useEffect, useState } from 'react'

import code from '../../Assets/code.png'
import '../../Styles/Crimas/crimas.scss'

const CrimasTile: React.FC<{ state: SwtState }> = ({ state }) => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		const maxLengthStatement = state.crimasMessage.slice(0, 50)
		setMessage(maxLengthStatement)
	}, [state.crimasMessage])

	return (
		<div className="crimas-tile">
			<div className="statement">{message}</div>
			<div className="prompts">
				<div className="top"><img src={code} alt="" /></div>
				<div className="bot">Change the message</div>
			</div>
		</div>
	)
}

export default CrimasTile
