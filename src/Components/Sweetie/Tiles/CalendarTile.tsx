import React, { useEffect } from 'react';
import { format } from 'date-fns'
import useCalendarDays from '../../../Hooks/useCalendarDays';

import '../../../Styles/Sweetie/Tiles/calendar-tile.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const CalendarTile: React.FC<Props> = (props) => {
	const { state } = props
	const { calendarDays, MapEvents } = useCalendarDays()

	useEffect(() => {
		MapEvents(state.calendarEvents)
	}, [state.calendarEvents])

	function calendarEventClassName(event: CalendarEvent) {
		const cns = ['event']
		const work = 'Mayo'

		if (event.name) cns.push('line')
		if (event.name.includes(work)) cns.push('work')

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
						<div key={i} className={day.dayCns}>
							<p className={day.numberCns}>{day.number}</p>
							{day.events.slice(0, 4).map((event, i) =>
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
		time = time + '-' + end
	}

	return time
}

function trimTime(time: string) {
	let slice = time.split(':')
	const hour = slice[0]
	const minute = slice[1].substring(0, 2)


	let meridian = RegExp(/AM|PM/g).test(slice[1])
		? ' ' + slice[1].split(' ')[1]
		: ''

	meridian = meridian.replace('AM', 'a')
	meridian = meridian.replace('PM', 'p')

	time = hour + ':' + minute
	if (slice[1].includes('00')) {
		time = hour
	}
	return time + '' + meridian
}