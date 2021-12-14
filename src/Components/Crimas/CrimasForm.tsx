import React, { useEffect, useState } from 'react'

import Api from '../../api'

import '../../Styles/index.scss'
import '../../Styles/Suite/suite.scss'
import '../../Styles/Crimas/CrimasForm.scss'
import '../../Styles/Crimas/Snowfall.scss'

const profanity = require('profanity-censor')

const CrimasForm: React.FC<any> = ({ socket, state, dispatch }) => {
	const [message, setMessage] = useState('')
	const [msgLen, setMsgLen] = useState(0)
	const [button, setButton] = useState('Submit')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setMsgLen(message.length)
	}, [message])

	function change(msg: string) {
		const maxLength = msgLen >= 50
		const backspaced = msg.length <= message.length

		if (maxLength && !backspaced) return

		setMessage(profanity.filter(msg))
	}

	function submit(e: any) {
		e.preventDefault()
		if (message === state.crimasMessage) return
		if (!message) return

		setButton('Processing')
		setLoading(true)

		console.log({ Message: message })
		Api.UpdateCrimasMessage(message).then((cm) => {
			dispatch({ type: 'CrimasMessage', value: cm })
			socket.emit('update-message', message)
			setButton('Done, goodbye.')
		})
	}

	return (
		<div className="crimas-form">
			<h2 className="title">Change Message</h2>
			<form onSubmit={(e) => submit(e)}>
				<input
					type="text"
					name="message"
					autoComplete="off"
					value={message}
					placeholder={state.crimasMessage}
					onChange={(e) => change(e.target.value)} />
				<button
					className="submit"
					type="submit"
					disabled={loading}>
					{button}
				</button>
			</form>
			<div id="Snowfall" />
		</div>
	)
}

export default CrimasForm