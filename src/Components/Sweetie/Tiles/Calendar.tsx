import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'
import Api from '../../../api'

import '../../../Styles/Sweetie/Tiles/calendar.scss'

interface CalendarDay {
	currentMonth: number,
	date: string,
	month: number
	number: number
	year: number
	events: CalendarEvent[]
	className: string
}

const Calendar: React.FC = () => {
	const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([])
	const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([])

	const date = new Date()
	const today = date.getDate()

	useEffect(() => {
		(async () => Api.GetCalendarEvents().then(ce => {
			console.log({ calendarEvents: ce })
			setCalendarEvents(ce)
			setCalendarDays(CreateCalendarDays(ce))
		}))()
	}, [])

	useEffect(() => {
		let calendarDayTitle = document.querySelectorAll('.day .number')
		if (calendarDayTitle) {
			calendarDayTitle.forEach((d) => {
				if (parseInt(d.textContent!) === today) {
					d.classList.add('today-mark')
				}
			})
		}
	}, [calendarDays])

	function formatEventTimes(event: CalendarEvent) {
		const { startTime, endTime } = event

		if (!event.timed || (event.timed && !startTime)) return

		const date = new Date(event.date).toJSON().split('T')[0]

		const sDate = new Date(date + 'T' + startTime)
		const start = trimTime(format(sDate, endTime ? 'h:mm' : 'p'))

		let time = start
		if (endTime) {
			const eDate = new Date(date + 'T' + endTime)
			const end = trimTime(format(eDate, 'p'))
			time = time + ' - ' + end
		}
		return time
	}

	function trimTime(time: string) {
		let slice = time.split(':')
		const hour = slice[0]
		const minute = slice[1].substring(0, 2)

		const meridian = RegExp(/AM|PM/g).test(slice[1])
			? slice[1].split(' ')[1]
			: ''

		time = hour + ':' + minute
		if (slice[1].includes('00')) {
			time = hour
		}

		return time + ' ' + meridian
	}

	function calendarEventClassName(event: CalendarEvent) {
		const cns = ['event']
		const works = ['STJ', 'TMC', 'Work']

		if (event.name) cns.push('line')
		if (works.includes(event.name)) cns.push('work')

		return cns.join(' ')
	}

	const weekdays = [
		'Sunday', 'Monday',
		'Tueday', 'Wednesday',
		'Thursday', 'Friday', 'Saturday'
	]

	function CreateCalendarDays(ces: CalendarEvent[]) {
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

			let dayEvents = ces.filter(ce => {
				return ce.date === new Date(firstDayOfMonth).toJSON()
			})

			let calendarDay = {
				className: sameMonth ? '' : 'out-of-month',
				currentMonth: firstDayOfMonth.getMonth(),
				date: new Date(firstDayOfMonth).toJSON(),
				month: firstDayOfMonth.getMonth(),
				number: firstDayOfMonth.getDate(),
				year: firstDayOfMonth.getFullYear(),
				events: dayEvents,
			}
			days.push(calendarDay)
		}

		console.log({ calenderDays: days });
		return days
	}

	return (
		<div className="calendar">
			<div className="calendar-cont">
				<div className="header">
					{weekdays.map((weekday, i) => (
						<div key={i} className="weekday">
							<p>{weekday}</p>
						</div>
					))}
				</div>
				<div className="content">
					{calendarDays.map((day: CalendarDay, i: number) => (
						<div key={i} className="day">
							<p className={`number ${day.className}`}>{day.number}</p>
							{day.events.slice(0, 4).map((event, i) =>
								!day.className &&
								<p key={i} className={calendarEventClassName(event)}>
									<span className="name">{event.name}</span>
									<span className="timed">
										{event.timed
											? formatEventTimes(event)
											: ''
										}</span>
								</p>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Calendar
