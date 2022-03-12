import React, { useEffect, useState } from 'react'

import 'Styles/modules/calendar.scss'

interface Props {
	state: SwtState
}

const CalendarModule: React.FC<Props> = (props) => {
	const { state } = props
	const [calendar, setCalendar] = useState<Array<CalendarDay>>([])

	useEffect(() => {
		setCalendar(state.calendar)
	}, [state.calendar])

	function eventClassName(event: CalendarEvent) {
		const cns = ['dot']
		const work = 'Work'

		if (event.name) cns.push('line')
		if (event.name.includes(work)) cns.push('work')

		return cns.join(' ')
	}

	return (
		<div className="calendar-module">
			<div className="module-cont">
				<div className="header">
					{weekdays.map((weekday, i) => (
						<div key={i} className="weekday">
							<p>{weekday}</p>
						</div>
					))}
				</div>
				<div className="content">
					{calendar.map((day, i) => (
						<div key={i} className={day.classNames.day}>
							<p className={day.classNames.number}>{day.number}</p>
							<div className="events">
								{day.events.map((event, i) =>
									<div key={i} className={eventClassName(event)}>
										•
									</div>
								)}
							</div>
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
