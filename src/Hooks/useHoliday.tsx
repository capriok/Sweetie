import { useEffect, useState } from 'react'

// https://app.abstractapi.com/api/holidays/documentation

const useHoliday = () => {
	const [holiday, setHoliday] = useState<any>({
		loading: true,
		name: ''
	})

	const FetchHoliday = async () => {
		const date = new Date()
		const API = `https://holidays.abstractapi.com/v1/`
		const KEY = process.env.REACT_APP_HOLIDAY_KEY
		const url = `${API}?api_key=${KEY}&country=US&year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`

		const response = await fetch(url)
		const res = await response.json()

		if (!res.length) return setHoliday({ ...holiday, loading: false })

		const results = {
			loading: false,
			name: res[0].name
		}
		setHoliday(results)
	}

	useEffect(() => {
		FetchHoliday()
	}, [])

	return holiday
}

export default useHoliday