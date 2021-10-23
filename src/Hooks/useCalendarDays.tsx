import { useEffect, useState } from 'react'

interface CalendarDay {
	className: string
	currentMonth: number
	date: string
	month: number
	number: number
	year: number
	events: CalendarEvent[]
}

const useCalendarDays = () => {
	const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])

	const date = new Date()

	function Create() {
		let days = []
		const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
		const weekdayOfFirstDay = firstDayOfMonth.getDay()

		for (let date = 0; date < 42; date++) {
			if (date === 0 && weekdayOfFirstDay === 0) {
				firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7)
			} else if (date === 0) {
				firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (date - weekdayOfFirstDay))
			} else {
				firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1)
			}

			const sameMonth = firstDayOfMonth.getMonth() === new Date().getMonth()

			let calendarDay = {
				className: sameMonth ? '' : 'out-of-month',
				currentMonth: firstDayOfMonth.getMonth(),
				date: new Date(firstDayOfMonth).toJSON(),
				month: firstDayOfMonth.getMonth(),
				number: firstDayOfMonth.getDate(),
				year: firstDayOfMonth.getFullYear(),
				events: []
			}
			days.push(calendarDay)
		}

		console.log({ calenderDays: days })
		setCalendarDays(days)
	}

	function MapEvents(ces: CalendarEvent[]) {
		setCalendarDays(days => days.map(day => {
			let events = ces.filter(ce => {
				return ce.date === day.date
			})
			return { ...day, events }
		}))
	}

	useEffect(() => {
		Create()
	}, [])

	return { calendarDays, MapEvents }
}

export default useCalendarDays