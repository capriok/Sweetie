import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const useAppTheme = () => {
	const [lsValue, setLsValue] = useLocalStorage('Swt-Theme')

	const config = {
		h: '--themeH',
		s: '--themeS',
		l: '--themeL',
	}

	useEffect(() => {
		if (lsValue) {
			setThemeValues({
				h: lsValue[config.h],
				s: lsValue[config.s],
				l: lsValue[config.l]
			})
		}
	}, [])

	function setThemeValues(theme: { h: string, s: string, l: string }) {
		const { h, s, l } = theme

		setLsValue({
			[config.h]: h,
			[config.s]: s,
			[config.l]: l,
		})

		document.documentElement.style.setProperty(config.h, h)
		document.documentElement.style.setProperty(config.s, s)
		document.documentElement.style.setProperty(config.l, l)
	}

	return { setThemeValues }
}

export default useAppTheme