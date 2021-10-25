import React, { useEffect } from 'react';
import { format } from 'date-fns'
import useCalendarDays from '../../../Hooks/useCalendarDays';

import '../../../Styles/Sweetie/Tiles/calendar-tile.scss'

const CalendarTile: React.FC<{ state: SwtState }> = ({ state }) => {
	const { calendarDays, MapEvents } = useCalendarDays()

	useEffect(() => {
		MapEvents(state.calendarEvents)
	}, [state.calendarEvents])

	useEffect(() => {
		let calendarDayTitle = document.querySelectorAll('.day .number')
		if (calendarDayTitle) {
			calendarDayTitle.forEach((d) => {
				if (parseInt(d.textContent!) === new Date().getDate()) {
					d.classList.add('today-mark')
				}
			})
		}
	}, [calendarDays])


	function calendarEventClassName(event: CalendarEvent) {
		const cns = ['event']
		const works = ['SJH', 'TMC']

		if (event.name) cns.push('line')
		if (works.includes(event.name)) cns.push('work')

		return cns.join(' ')
	}

	return (
		<div className="calendar-tile">
			<div className="calendar-cont">
				<div className="header">
					{weekdays.map((weekday, i) => (
						<div key={i} className="weekday">
							<p>{weekday}</p>
						</div>
					))}
				</div>
				<div className="content">
					{calendarDays.map((day, i: number) => (
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

export default CalendarTile

const weekdays = [
	'Sunday', 'Monday',
	'Tueday', 'Wednesday',
	'Thursday', 'Friday', 'Saturday'
]

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