import React, { useEffect, useState } from 'react'

import '../styles/splash.scss'

interface props {
	pass: string
	setPass: React.Dispatch<string>
	setAuth: React.Dispatch<boolean>
}

const Splash: React.FC<props> = ({ pass, setPass, setAuth }) => {
	const passcode = process.env.REACT_APP_PASSCODE
	const democode = '0000'

	const [title, setTitle] = useState('Passcode')

	function handlePasscodeChange(e: any) {
		const val: string = e.target.value

		if (!val) return setPass('')
		if (val.length > 4) return

		document.getElementById('splash-title')?.classList.remove('incorrect')

		const exp = new RegExp(/^[0-9]+$/)
		if (!exp.test(val)) return

		setPass(val)
	}

	useEffect(() => {
		pass.length === 4 && submitPass()
	}, [pass])

	function submitPass() {
		if (pass === passcode || pass === democode) {
			welcomeAnimation()
			localStorage.setItem(
				'Swt-Auth',
				JSON.stringify({ pass, auth: true, last: new Date().toJSON() })
			)
		} else {
			incorrectAnimation()
		}
	}

	function welcomeAnimation() {
		setTitle('Welcome')
		const title = document.getElementById('splash-title')
		if (title) title.classList.add('welcome')
		return setTimeout(() => {
			setAuth(true)
		}, 1000)
	}

	function incorrectAnimation() {
		setTitle('Incorrect')
		const title = document.getElementById('splash-title')
		if (title) title.classList.add('incorrect')
	}

	return (
		<div className="splash">
			<h2 id="splash-title">{title}</h2>
			<input
				autoFocus={true}
				type="password"
				value={pass}
				onChange={(e) => handlePasscodeChange(e)} />
		</div>
	)
}

export default Splash