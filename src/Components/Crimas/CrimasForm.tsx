import React, { useEffect, useLayoutEffect, useState } from 'react'

import Api from '../../api'

import '../../Styles/index.scss'
import '../../Styles/Suite/suite.scss'
import '../../Styles/Crimas/CrimasForm.scss'
import '../../Styles/Crimas/Snowfall.scss'

const profanity = require('profanity-censor')

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<any>
}

const CrimasForm: React.FC<Props> = (props) => {
	const { socket, state, dispatch } = props
	const [message, setMessage] = useState('')
	const [msgLength, setMsgLength] = useState(0)
	const [button, setButton] = useState('Submit')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setMsgLength(message.length)
	}, [message])

	useLayoutEffect(() => {
		let len = document.getElementById('length')!
		msgLength === 50
			? len.style.color = '#c22929'
			: len.style.color = 'grey'
	}, [msgLength])

	function change(msg: string) {
		const maxLength = msgLength >= 50
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
				<div className="current">
					<label>Current:</label>
					<div>{state.crimasMessage}</div>
				</div>
				<div className="input">
					<input
						type="text"
						name="message"
						autoComplete="off"
						value={message}
						placeholder="New Message"
						onChange={(e) => change(e.target.value)} />
					<div id="length">{msgLength}/50</div>
				</div>
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