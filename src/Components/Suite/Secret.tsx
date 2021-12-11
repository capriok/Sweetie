import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import '../../Styles/Suite/secret.scss'
import Pinpad from './Pinpad'

const Secret: React.FC<any> = ({ auth, setAuth, setReadOnly }) => {
	const passcode = process.env.REACT_APP_PASSCODE
	const democode = '0000'

	const [success, setSuccess] = useState(false)
	const [loading, setloading] = useState(true)
	const [title, setTitle] = useState('Secret')
	const [pinPass, setPin] = useState<Array<number>>([])

	function resetTitle() {
		setTitle('Secret')
		document.getElementById('secret-title')?.classList.remove('Invalid')
	}

	function digitClick(digit: number) {
		if (success) return

		resetTitle()
		let pincode = [...pinPass]
		if (digit === -1) {
			pincode.pop()
			setPin(pincode)
		} else {
			pincode.push(digit)
			setPin(pincode)
		}
	}

	useEffect(() => {
		if (pinPass.length === 4) submitPass()
	}, [pinPass])

	function submitPass() {
		const p: string = pinPass.join('')
		if (p === democode || p === passcode) {
			setSuccess(true)
			localStorage.setItem('Swt-Auth', JSON.stringify({
				p,
				auth: true,
				last: new Date().toJSON()
			}))
			if (p === democode) {
				animate('Guest', () => {
					setAuth(true)
					setReadOnly(true)
				})
			}
			if (p === passcode) {
				animate('Welcome', () => {
					setAuth(true)
					setReadOnly(false)
				})
			}
		} else {
			animate('Invalid')
			setPin([])
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
		setloading(false)
	}, [auth])

	return (
		<div className="secret">
			{loading
				? <></>
				: <>
					<h3 id="secret-title">{title}</h3>
					<div className="pin"
						onClick={() => document.querySelector('input')?.focus()}>
						{passcode!.split('').map((_, i) => (
							<div key={i} className={pinPass[i] !== undefined ? 'mark val' : 'mark dot'} />
						))}
					</div>
					<Pinpad set={digitClick} />
				</>
			}
		</div>
	)
}

export default Secret