import React, { useEffect, useState } from 'react'

import Api from '../../api'

import '../../Styles/index.scss'
import '../../Styles/Suite/suite.scss'
import '../../Styles/Crimas/crimas.scss'

const CrimasForm: React.FC<any> = ({ state, dispatch }) => {
	const [message, setMessage] = useState('')
	const [btn, setBtn] = useState('Submit')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setMessage(state.crimasMessage)
	}, [state.crimasMessage])

	function submit(e: any) {
		e.preventDefault()
		if (message === state.crimasMessage) return

		setBtn('- - -')
		setLoading(true)

		console.log({ Message: message })
		Api.UpdateCrimasMessage(message).then((cm) => {
			dispatch({ type: 'CrimasMessage', value: cm })
			setBtn('Done, goodbye.')
		})
	}
	return (
		<div className="crimas-form">
			<h2 className="title">Change Message</h2>
			<div className="form">
				<form onSubmit={(e) => submit(e)}>
					<div className="form-line name">
						<textarea
							name="message"
							value={message}
							rows={4}
							maxLength={50}
							required={true}
							autoFocus={true}
							autoComplete="off"
							placeholder="Change Message"
							onChange={(e) => setMessage(e.target.value)} />
					</div>
					<div className="form-submit">
						<button
							className="submit"
							type="submit"
							disabled={loading}>
							{btn}
						</button>
					</div>
				</form>
			</div>
			<div id="Snowfall" />
		</div>
	)
}

export default CrimasForm