import { useEffect, useState } from 'react'
import { startOfToday } from 'date-fns'
import { TimezoneZero } from '../Helpers/TimeHelp'

interface CalendarDay {
	dayCns: string
	numberCns: string
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
		const days: CalendarDay[] = []
		const day = new Date(date.getFullYear(), date.getMonth(), 1)
		const weekday = day.getDay()

		MapDays(day)

		function MapDays(day: Date, d = 0) {
			d === 0 && weekday === 0
				? day.setDate(day.getDate() - 7)
				: d === 0
					? day.setDate(day.getDate() + (d - weekday))
					: day.setDate(day.getDate() + 1)

			const prevMonth = new Date().getMonth() <= day.getMonth()
			const nextMonth = new Date().getMonth() >= day.getMonth()
			const sameDay = TimezoneZero(day).toJSON() === TimezoneZero(startOfToday()).toJSON()
			const inPast = TimezoneZero(day).toJSON() < TimezoneZero(startOfToday()).toJSON()

			const dayCns = ['day']
			if (!prevMonth) dayCns.push('null-day')
			if (!nextMonth || inPast) dayCns.push('blur-day')

			const numberCns = ['number']
			if (sameDay) numberCns.push('today-mark')
			if (nextMonth) numberCns.push('dull-number')

			let calendarDay: CalendarDay = {
				dayCns: dayCns.join(' '),
				numberCns: numberCns.join(' '),
				currentMonth: day.getMonth(),
				date: new Date(day).toJSON(),
				month: day.getMonth(),
				number: day.getDate(),
				year: day.getFullYear(),
				events: []
			}
			days.push(calendarDay)

			d < 41 && MapDays(day, d = d + 1)
		}

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