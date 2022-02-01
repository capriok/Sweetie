import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const useAppMode = () => {
	const [lsValue, setLsValue] = useLocalStorage('Swt-Mode')

	const colors = {
		light: {
			h: '0', s: '0%', l: '95%'
		},
		dark: {
			h: '0', s: '0%', l: '5%'
		}
	}

	const config = {
		h: '--modeH',
		s: '--modeS',
		l: '--modeL',
	}

	useEffect(() => {
		if (lsValue) setModeValue(lsValue.dark)
	}, [])

	function setModeValue(state: boolean) {
		const color = state ? colors.dark : colors.light

		setLsValue({ dark: state })

		document.documentElement.style.setProperty(config.h, color.h)
		document.documentElement.style.setProperty(config.s, color.s)
		document.documentElement.style.setProperty(config.l, color.l)
	}

	return { setModeValue }
}

export default useAppMode