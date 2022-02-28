import React, { useEffect, useState } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { useLocalStorage } from 'Hooks/useLocalStorage'

import Pinpad from './Pinpad'
import Pinview from './Pinview'

import 'Styles/components/auth/secret.scss'

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
			setloading(true)
			setTimeout(() => {
				setAuth(true)
			}, 500)
		} else {
			setTimeout(() => {
				document.getElementById('pin')!.classList.add('invalid')
				setTimeout(() => {
					setPincode([])
				}, 500)
			}, 250)
		}
	}

	const slideDownProps: MotionProps = {
		initial: 'hidden',
		transition: { duration: .5 },
		style: { width: '100%' },
		variants: {
			hidden: { opacity: 0, y: -500 },
			visible: { opacity: 1, y: 0 }
		}
	}
	return (
		<div className="secret">
			<motion.div {...slideDownProps} animate={!loading ? 'visible' : 'hidden'}>
				<div id="pinpad">
					<Pinview pincode={pincode.join('')} />
					<Pinpad set={digitClick} />
				</div>
			</motion.div>
		</div>
	)
}

export default Secret
