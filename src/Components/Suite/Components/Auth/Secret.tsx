import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import Pinpad from './Pinpad'

import 'Styles/Suite/components/auth/secret.scss'
import Pinview from './Pinview'

const Secret: React.FC<any> = ({ auth, setAuth }) => {
	const passcode = process.env.REACT_APP_PASSCODE

	const [loading, setloading] = useState(true)
	const [pincode, setPincode] = useState<Array<number>>([])

	function digitClick(digit: number) {
		if (pincode.length === 4) return

		document.getElementById('pin')!.classList.remove('Invalid')

		let pin = [...pincode]
		if (digit === -1) {
			pin.pop()
			setPincode(pin)
		} else {
			pin.push(digit)
			setPincode(pin)
		}
	}

	useEffect(() => {
		if (pincode.length === 4) submitPass()
	}, [pincode])

	function submitPass() {
		const pin: string = pincode.join('')
		if (pin === passcode) {
			localStorage.setItem('Swt-Auth', JSON.stringify({
				pass: pin,
				auth: true,
				last: new Date().toJSON()
			}))
			animate('Welcome', () => setAuth(true))
		} else {
			animate('Invalid')
		}
	}

	function animate(type: string, cb = () => { }) {
		let el: HTMLElement
		if (type === 'Welcome')
			el = document.getElementById('pinpad')!
		else if (type === 'Invalid')
			el = document.getElementById('pin')!

		setTimeout(() => {
			el.classList.add(type)
			setTimeout(() => {
				cb()
				setPincode([])
			}, 500)
		}, 250)
	}

	useEffect(() => {
		const ls = localStorage.getItem('Swt-Auth')
		if (ls) {
			const lsPass: { pass: string, auth: boolean, last: string } = JSON.parse(ls)
			const shouldRefresh = Math.abs(differenceInCalendarDays(new Date(lsPass.last), new Date())) > 6
			if (lsPass.pass !== passcode) return
			if (lsPass.auth && !shouldRefresh) return setAuth(true)
		}
		setloading(false)
		return () => setloading(false)
	}, [auth])

	return (
		<div className="secret">
			{loading
				? <></>
				: <div id="pinpad">
					<Pinview pincode={pincode.join('')} />
					<Pinpad set={digitClick} />
				</div>
			}
		</div>
	)
}

export default Secret
