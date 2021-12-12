import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import '../../Styles/Suite/secret.scss'
import Pinpad from './Pinpad'

const Secret: React.FC<any> = ({ auth, setAuth, setReadOnly }) => {
	const passcode = process.env.REACT_APP_PASSCODE
	const democode = '0000'

	const [success, setSuccess] = useState(false)
	const [loading, setloading] = useState(true)
	const [pincode, setPincode] = useState<Array<number>>([])

	function digitClick(digit: number) {
		if (success) return

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
		if (pin === democode || pin === passcode) {
			setSuccess(true)
			localStorage.setItem('Swt-Auth', JSON.stringify({
				pass: pin,
				auth: true,
				last: new Date().toJSON()
			}))
			if (pin === democode) {
				animate('Welcome', () => {
					setAuth(true)
					setReadOnly(true)
				})
			}
			if (pin === passcode) {
				animate('Welcome', () => {
					setAuth(true)
					setReadOnly(false)
				})
			}
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
				: <div id="pinpad">
					<div id="pin">
						{passcode!.split('').map((_, i) =>
							<div key={i} className={
								pincode[i] !== undefined
									? 'mark val'
									: 'mark dot'
							} />
						)}
					</div>
					<Pinpad set={digitClick} />
				</div>
			}
		</div>
	)
}

export default Secret
