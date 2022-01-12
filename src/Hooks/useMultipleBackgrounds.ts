import { useEffect } from 'react'

const init = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const useMultipleBackgrounds = () => {
	let bgs = [...init]

	const setBackground = () => {
		const randomIndex = Math.floor((Math.random() * bgs.length - 1) + 1)

		if (!bgs.length) bgs = [...init]

		const randomImage = bgs[randomIndex]
		bgs.splice(bgs.indexOf(randomImage), 1)

		const image = `${6}.jpg`
		const bg = document.getElementById('Background')
		bg!.style.backgroundImage = `url("/bgs/${image}")`
	}
	useEffect(() => {
		setInterval(setBackground, 600000)
	}, [])
}

export default useMultipleBackgrounds
