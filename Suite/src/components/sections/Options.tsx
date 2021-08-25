import React from 'react'

import '../../styles/sections/options.scss'
const Options: React.FC<any> = ({ props }) => {
	const { auth, setAuth, readOnly } = props

	function LogoutClick() {
		localStorage.removeItem('Swt-Auth')
		window.location.reload()
	}
	function AuthenticateClick() {
		setAuth(false)
		localStorage.removeItem('Swt-Auth')
	}

	function BoolToString(bool: boolean) {
		return bool.toString()[0].toUpperCase() + bool.toString().substring(1)
	}

	function DateToLocaleString(date = new Date()) {
		return new Date(date).toLocaleDateString('en-us',
			{ weekday: 'short', month: 'short', day: 'numeric' }
		)
	}

	let lastAuth = localStorage.getItem('Swt-Auth')
	if (lastAuth) {
		lastAuth = DateToLocaleString(JSON.parse(lastAuth).last)
	} else {
		lastAuth = DateToLocaleString()
	}

	return (
		<div className="section-scroll">
			<div className="content options">
				<div className="content-line last-atuh">
					<label>Last Authentication</label>
					<p>{lastAuth}</p>
				</div>
				<div className="content-line authed">
					<label>Authenticated</label>
					<p>{BoolToString(auth)}</p>
				</div>
				<div className="content-line read-only">
					<label>Read Only</label>
					<p>{BoolToString(readOnly)}</p>
				</div>
				{readOnly &&
					<div className="authenticate">
						<button onClick={AuthenticateClick}>Disable Read Only</button>
					</div>
				}
				<div className="logout">
					<button onClick={LogoutClick}>Logout</button>
				</div>
			</div>
		</div>
	)
}

export default Options