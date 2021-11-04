import { startOfToday } from 'date-fns'
import { useEffect, useState } from 'react'
import { tzZero } from '../api'

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
		let days = []
		const day = new Date(date.getFullYear(), date.getMonth(), 1)
		const weekdayOfFirstDay = day.getDay()

		for (let date = 0; date < 42; date++) {
			if (date === 0 && weekdayOfFirstDay === 0) {
				day.setDate(day.getDate() - 7)
			} else if (date === 0) {
				day.setDate(day.getDate() + (date - weekdayOfFirstDay))
			} else {
				day.setDate(day.getDate() + 1)
			}

			const prevMonth = new Date().getMonth() <= day.getMonth()
			const nextMonth = new Date().getMonth() >= day.getMonth()
			const sameDay = tzZero(day).toJSON() === tzZero(startOfToday()).toJSON()
			const inPast = tzZero(day).toJSON() < tzZero(startOfToday()).toJSON()

			const dayCns = ['day']
			if (!prevMonth) dayCns.push('null-day')
			if (!nextMonth || inPast) dayCns.push('blur-day')

			const numberCns = ['number']
			if (sameDay) numberCns.push('today-mark')
			if (nextMonth) numberCns.push('dull-number')

			let calendarDay = {
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