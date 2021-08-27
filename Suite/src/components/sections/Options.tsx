import React, { useEffect } from 'react'

import '../../styles/sections/options.scss'

const HEXtoHSL = require('hex-to-hsl');

const Options: React.FC<any> = ({ props }) => {
	const { auth, setAuth, readOnly } = props

	let lastAuth = localStorage.getItem('Swt-Auth')
	lastAuth
		? lastAuth = dateToLocaleString(JSON.parse(lastAuth).last)
		: lastAuth = dateToLocaleString()

	function LogoutClick() {
		setAuth(false)
		localStorage.removeItem('Swt-Auth')
	}

	function SetPrimaryHSL(e: any) {
		const hsl = HEXtoHSL(e.target.value)
		setThemeValue('--primary-h', hsl[0])
		setThemeValue('--primary-s', `${hsl[1]}%`)
		setThemeValue('--primary-l', `${hsl[2]}%`)
	}

	function SetThemeInLocalStorage(prop: string, value: string) {
		const lsTheme = localStorage.getItem('Swt-Theme')
		if (lsTheme) {
			const theme = JSON.parse(lsTheme)
			theme[prop] = value
			localStorage.setItem('Swt-Theme', JSON.stringify(theme))
		} else {
			localStorage.setItem('Swt-Theme', JSON.stringify({ [prop]: value }))
		}
	}

	const theme: any = {
		primaryH: getThemeValue('--primary-h'),
		primaryS: getThemeValue('--primary-s'),
		primaryL: getThemeValue('--primary-l'),
	}
	theme.primaryHSL = `hsl(${theme.primaryH}, ${theme.primaryS}, ${theme.primaryL})`

	useEffect(() => {
		const lsTheme = localStorage.getItem('Swt-Theme')
		if (lsTheme) {
			const theme = JSON.parse(lsTheme)
			setThemeValue('--primary-h', theme['--primary-h'])
			setThemeValue('--primary-s', theme['--primary-s'])
			setThemeValue('--primary-l', theme['--primary-l'])
		}
	}, [])

	function boolToString(bool: boolean) {
		return bool.toString()[0].toUpperCase() + bool.toString().substring(1)
	}

	function dateToLocaleString(date = new Date()) {
		return new Date(date).toLocaleDateString('en-us',
			{ weekday: 'short', month: 'short', day: 'numeric' }
		)
	}

	function getThemeValue(prop: string) {
		return document.documentElement.style.getPropertyValue(prop)
	}

	function setThemeValue(prop: string, value: string) {
		SetThemeInLocalStorage(prop, value)
		return document.documentElement.style.setProperty(prop, value)
	}


	return (
		<div className="section-scroll">
			<div className="content options">
				<ContentLine
					className="last-authed"
					label="Last Authentication">
					{lastAuth}
				</ContentLine>
				<ContentLine
					className="authed"
					label="Authenticated">
					{boolToString(auth)}
				</ContentLine>
				<ContentLine
					className="read-only"
					label="Read only">
					{boolToString(readOnly)}
				</ContentLine>
				<ContentLine
					className="theme"
					label="Theme">
					<input
						type="color"
						onChange={(e) => SetPrimaryHSL(e)} />
				</ContentLine>
				<div className="logout">
					<button tabIndex={-1} onClick={LogoutClick}>Logout</button>
				</div>
			</div>
		</div>
	)
}

export default Options

const ContentLine: React.FC<any> = ({ className, label, children }) => (
	<div className={'content-line ' + className}>
		<label>{label}</label>
		<p>{children}</p>
	</div>
)
