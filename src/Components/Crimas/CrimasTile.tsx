import { useEffect, useState } from 'react'

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
				<div className="top">Change the message, go to</div>
				<div className="bot">sweetie.kylecaprio.dev/crimas</div>
			</div>
		</div>
	)
}

export default CrimasTile
