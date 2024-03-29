import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'app'
import { useLocalStorage } from 'Hooks/useLocalStorage'

import PageItem from 'Components/Page/Item'

import 'Styles/pages/options.scss'

const HEXtoHSL = require('hex-to-hsl')

const OptionsPage: React.FC = () => {
	const { auth, setAuth, setModeValue, setThemeValues } = useContext(AppContext)

	const [modeState, setModeState] = useState(false)

	const [lsAuth] = useLocalStorage('Swt-Auth')
	const [lsMode] = useLocalStorage('Swt-Mode')

	useEffect(() => {
		if (lsMode) {
			setModeState(lsMode.dark)
			setModeValue!(lsMode.dark)
		}
	}, [])

	function logoutClick() {
		setAuth!(false)
		localStorage.removeItem('Swt-Auth')
	}

	function modeChange(e: any) {
		setModeState(e.target.checked)
		setModeValue!(e.target.checked)
	}

	function themeChange(e: any) {
		const hsl = HEXtoHSL(e.target.value)
		setThemeValues!({
			h: hsl[0],
			s: `${hsl[1]}%`,
			l: `${hsl[2]}%`
		})
	}

	return (
		<div className="options">
			<Option label="Last Authentication">
				{lsAuth
					? dateToLocaleString(lsAuth.last)
					: dateToLocaleString()}
			</Option>
			<Option
				label="Authenticated">
				{boolToString(auth!)}
			</Option>
			<Option label="Theme">
				<input
					type="color"
					onChange={(e) => themeChange(e)} />
			</Option>
			<Option label="Dark mode">
				<input
					type="checkbox"
					checked={modeState}
					onChange={(e) => modeChange(e)} />
			</Option>
			<div className="logout">
				<button onClick={logoutClick}>Logout</button>
			</div>
		</div>
	)
}

export default OptionsPage

const Option: React.FC<any> = ({ label, children }) => (
	<PageItem className="option-wrap">
		<label>{label}</label>
		<p>{children}</p>
	</PageItem>
)

function boolToString(bool: boolean) {
	return bool.toString()[0].toUpperCase() + bool.toString().substring(1)
}

function dateToLocaleString(date = new Date()) {
	return new Date(date).toLocaleDateString('en-us',
		{ weekday: 'short', month: 'short', day: 'numeric' }
	)
}