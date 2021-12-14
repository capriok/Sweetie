import { useEffect, useState } from 'react'
import Api from '../../api';

import code from '../../Assets/code.png'
import '../../Styles/Crimas/CrimasTile.scss'

const profanity = require('profanity-censor');

const CrimasTile: React.FC<{ state: SwtState }> = ({ state }) => {
	const [message, setMessage] = useState('')

	useEffect(() => {
		setMessage(state.crimasMessage)
	}, [state.crimasMessage])

	useEffect(() => {
		setInterval(() => {
			if (new Date().getDate() !== 18) return
			Api.GetCrimasMessage().then((cm) => {
				console.log({ CrimasMessage: cm })
				setMessage(cm)
			})
		}, 5000)
	}, [])

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
