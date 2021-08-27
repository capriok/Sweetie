import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import '../styles/secret.scss'

const Secret: React.FC<any> = ({ auth, setAuth, setReadOnly }) => {
	const passcode = process.env.REACT_APP_PASSCODE
	const democode = '0000'

	const [success, setSuccess] = useState(false)
	const [loading, setloading] = useState(true)
	const [title, setTitle] = useState('Secret')
	const [pass, setPass] = useState<string>('')

	function resetForm() {
		setTitle('Secret')
		document.getElementById('secret-title')?.classList.remove('incorrect')
	}

	function validate(val: string) {
		const exp = new RegExp(/^[0-9]+$/)
		return !exp.test(val)
			? false
			: true
	}

	function handlePasscodeChange(e: any) {
		const val: string = e.target.value

		if (success) return
		if (!val) return setPass('')

		resetForm()

		if (!validate(val)) return

		val.length > 4
			? setPass(val.substring(4))
			: setPass(val)
	}

	useEffect(() => {
		if (pass.length === 4) submitPass()
	}, [pass])

	function submitPass() {
		if (pass === democode || pass === passcode) {
			setSuccess(true)
			localStorage.setItem('Swt-Auth', JSON.stringify({
				pass,
				auth: true,
				last: new Date().toJSON()
			}))
			if (pass === democode) {
				animate('Guest', () => {
					setAuth(true)
					setReadOnly(true)
				})
			}
			if (pass === passcode) {
				animate('Hello', () => {
					setAuth(true)
					setReadOnly(false)
				})
			}
		} else {
			animate('Incorrect')
		}
	}

	function animate(title: string, cb = () => { }) {
		setTitle(title)
		const el = document.getElementById('secret-title')
		if (el) {
			setTimeout(() => {
				el.classList.add(title)
				setTimeout(() => {
					cb()
					el.classList.remove(title)
				}, 1000)
			}, 500)
		}
	}

	useEffect(() => {
		const ls = localStorage.getItem('Swt-Auth')
		if (ls) {
			const lsPass: { pass: string, auth: boolean, last: string } = JSON.parse(ls)
			const shouldRefresh = Math.abs(differenceInCalendarDays(new Date(lsPass.last), new Date())) > 6
			if (lsPass.pass !== democode && lsPass.pass !== passcode) return
			if (lsPass.pass !== democode && lsPass.pass === passcode) setReadOnly(false)
			if (lsPass.auth && !shouldRefresh) setAuth(true)
		}
		return setloading(false)
	}, [auth])

	return (
		<div className="secret">
			{loading
				? <></>
				: <>
					<h3 id="secret-title">{title}</h3>
					<div
						className="input"
						onClick={() => document.querySelector('input')?.focus()}>
						{passcode!.split('').map((_, i) => (
							<div key={i} className={pass[i] ? 'mark val' : 'mark dot'} />
						))}
					</div>
					<input
						autoFocus={true}
						type="password"
						value={pass}
						onChange={(e) => handlePasscodeChange(e)} />
				</>
			}

		</div>
	)
}

export default Secret