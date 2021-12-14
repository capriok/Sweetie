import { useEffect, useState } from 'react'
// import Api from '../../api';

import code from '../../Assets/code.png'
import '../../Styles/Crimas/CrimasTile.scss'

const profanity = require('profanity-censor');

const CrimasTile: React.FC<any> = ({ socket, state }) => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		socket.on('message-change', (msg: string) => {
			setMessage(msg)
		})
	}, [])

	useEffect(() => {
		setMessage(state.crimasMessage)
	}, [state.crimasMessage])

	function censor(message: string) {
		message = profanity.filter(message)
		return message.slice(0, 50)
	}

	return (
		<div className="crimas-tile">
			<div className="message">{censor(message)}</div>
			<div className="prompts">
				<div className="top">
					<img className="qr" src={code} alt="" />
				</div>
				<div className="bot">Change message</div>
			</div>
		</div>
	)
}

export default CrimasTile
