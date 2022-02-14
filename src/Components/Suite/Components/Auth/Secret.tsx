import React, { useEffect, useState } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { useLocalStorage } from 'Hooks/useLocalStorage'

import Pinpad from './Pinpad'

import 'Styles/Suite/components/auth/secret.scss'
import Pinview from './Pinview'

const Secret: React.FC<any> = ({ auth, setAuth }) => {
	const passcode = process.env.REACT_APP_PASSCODE

	const [lsAuth, setLsAuth] = useLocalStorage('Swt-Auth')

	const [loading, setloading] = useState(true)
	const [pincode, setPincode] = useState<Array<number>>([])

	useEffect(() => {
		if (lsAuth) {
			if (lsAuth.pass !== passcode) return
			if (lsAuth.auth) {
				setLsAuth({
					...lsAuth,
					last: new Date().toJSON()
				})
				return setAuth(true)
			}
		}
		setloading(false)
		return () => setloading(false)
	}, [auth])


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
			setLsAuth({
				pass: pin,
				auth: true,
				last: new Date().toJSON()
			})
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

	const slideDownProps: MotionProps = {
		initial: 'hidden',
		transition: {
			duration: .5,
		},
		style: { width: '100%', },
		variants: {
			hidden: { opacity: 0, y: -40 },
			visible: { opacity: 1, y: 0 }
		}
	}

	return (
		<div className="secret">
			{/* <motion.div {...slideDownProps} animate={auth ? 'visible' : 'hidden'}>
				{loading
					? <></>
					: <div id="pinpad">
						<Pinview pincode={pincode.join('')} />
						<Pinpad set={digitClick} />
					</div>
				}
			</motion.div> */}

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
