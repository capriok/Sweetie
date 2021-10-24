import { useEffect } from 'react';

const useNodeEnvEffects = () => {
	const isProductionEnv = process.env.NODE_ENV === 'production'
	useEffect(() => {
		if (isProductionEnv) {
			console.log = () => { }
			document.getElementById('Sweetie')?.classList.add('Swt-vert')
			document.getElementById('Background')?.classList.add('Bg-vert')
		}
	}, [])
}

export default useNodeEnvEffects