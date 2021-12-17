import { useEffect, useState } from 'react'

const useDarkMode = () => {
	const [mode, setMode] = useState<boolean>(false)

	useEffect(() => {
		const lsMode = localStorage.getItem('Swt-Mode')
		if (!lsMode) return

		const mode = JSON.parse(lsMode)
		if (mode['--modebg'] !== 'white') setMode(true)
		document.documentElement.style.setProperty('--modebg', mode['--modebg'])
		document.documentElement.style.setProperty('--modefont', mode['--modefont'])
	}, [])

	return { mode, setMode }
}

export default useDarkMode