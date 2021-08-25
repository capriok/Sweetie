import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import '../styles/secret.scss'

const Secret: React.FC<any> = ({ auth, setAuth, setReadOnly }) => {
	const passcode = process.env.REACT_APP_PASSCODE
	const democode = '0000'

	const [title, setTitle] = useState('Secret')
	const [pass, setPass] = useState<string>('')

	function handlePasscodeChange(e: any) {
		const val: string = e.target.value

		if (!val) return setPass('')

		setTitle('Secret')
		document.getElementById('secret-title')?.classList.remove('incorrect')

		const exp = new RegExp(/^[0-9]+$/)
		if (!exp.test(val)) return

		if (val.length > 4) {
			setPass(val.substring(4))
		} else {
			setPass(val)
		}
	}

	useEffect(() => {
		if (pass.length === 4) submitPass()
	}, [pass])

	useEffect(() => {
		const ls = localStorage.getItem('Swt-Auth')
		if (ls) {
			const lsPass: { pass: string, auth: boolean, last: string } = JSON.parse(ls)
			const dif = Math.abs(differenceInCalendarDays(new Date(lsPass.last), new Date()))

			if (lsPass.pass !== democode && lsPass.pass !== passcode) return
			if (lsPass.pass !== democode && lsPass.pass === passcode) setReadOnly(false)
			if (lsPass.auth && dif <= 6) return setAuth(true)
		}
	}, [auth])


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
		setTitle('Success')
		const title = document.getElementById('secret-title')
		if (title) title.classList.add('welcome')
		return setTimeout(() => {
			setAuth(true)
		}, 1000)
	}

	function incorrectAnimation() {
		setTitle('Incorrect')
		const title = document.getElementById('secret-title')
		if (title) title.classList.add('incorrect')
	}

	return (
		<div className="secret">
			<h3 id="secret-title">{title}</h3>
			<div
				className="input"
				onClick={() => document.querySelector('input')?.focus()}>
				{passcode!.split('').map((_, i) => (
					<div className={pass[i] ? 'mark val' : 'mark dot'} />
				))}
			</div>
			<input
				autoFocus={true}
				type="password"
				value={pass}
				onChange={(e) => handlePasscodeChange(e)} />
		</div>
	)
}

export default Secret