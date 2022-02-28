import React, { useEffect } from 'react'
import { FormatEventTimes } from 'Helpers/TimeHelp'
import useCalendarDays from 'Hooks/useCalendarDays'

import 'Styles/modules/calendar.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const CalendarModule: React.FC<Props> = (props) => {
	const { state } = props
	const { calendarDays, MapEvents } = useCalendarDays()

	useEffect(() => {
		MapEvents(state.calendarEvents)
	}, [state.calendarEvents])

	function calendarEventClassName(event: CalendarEvent) {
		const cns = ['event']
		const work = 'Work'

		if (event.name) cns.push('line')
		if (event.name.includes(work)) cns.push('work')

		return cns.join(' ')
	}

	return (
		<div className="calendar-module">
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
											? FormatEventTimes(event)
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

export default CalendarModule

const weekdays = [
	'Sunday', 'Monday',
	'Tueday', 'Wednesday',
	'Thursday', 'Friday', 'Saturday'
]