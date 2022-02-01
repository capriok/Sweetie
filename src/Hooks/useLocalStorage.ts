import { useState } from 'react'

export const useLocalStorage = (key: string, initialValue: any = undefined) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			return getValue()
		} catch (error) {
			console.log(error)
			return initialValue
		}
	})
	const setValue = (value: any) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.log(error)
		}
	}

	function getValue() {
		const value = window.localStorage.getItem(key)
		return value ? JSON.parse(value) : initialValue
	}

	return [storedValue, setValue]
}