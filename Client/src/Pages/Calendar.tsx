import React, { useContext, useEffect, useState } from 'react'
import { FormatEventTimes } from 'Helpers/TimeHelp'
import { AppContext } from 'app'

import PageItem from 'Components/Page/Item'

import 'Styles/pages/calendar.scss'

const CalendarPage: React.FC = () => {
	const { state } = useContext(AppContext)

	const [eventList, setEventList] = useState<Array<CalendarEvent>>([])

	useEffect(() => {
		const events = FilterBeforeToday(state!.calendarEvents)
		setEventList(events)
	}, [state!.calendarEvents])

	return (
		<div className="calendar">
			{!eventList.length && <div className="list-title"><p><b>Events</b></p></div>}
			{!eventList.length
				? <PageItem><p className="ce-empty">No Events</p></PageItem>
				: eventList.map((event, i) => (
					<div key={i} className="event">
						<div className="month-wrap">{DisplayMonth(eventList, i)}</div>
						<PageItem className="event-wrap">
							<div className="name">
								<p>{event.name}</p>
							</div>
							<div className="date-time">
								<span className="date">
									{new Date(event.date).toLocaleDateString('en-us',
										{ weekday: 'short', month: event.timed ? 'short' : 'long', day: 'numeric' })
									}
								</span>
								<span className="time">
									{`${event.timed ? `, ${FormatEventTimes(event)}` : ''}`}
								</span>
							</div>
						</PageItem>
					</div>
				))}
		</div>
	)
}

export default CalendarPage

export function FilterBeforeToday(events: Array<CalendarEvent>) {
	return events.filter((e) => {
		const eventDate = new Date(e.date).getTime()
		const todayDate = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 1
		).getTime()

		return eventDate > todayDate && e
	})
}


function DisplayMonth(events: Array<CalendarEvent>, index: number) {
	const currEv = events[index]
	const currMonth = new Date(currEv.date).toLocaleString('default', { month: 'long' })

	const monthName = <p>{currMonth}</p>

	const prevEv = events[index - 1]
	if (!prevEv) return monthName

	const prevMonth = new Date(prevEv.date).toLocaleString('default', { month: 'long' })

	return prevMonth !== currMonth ? monthName : ''
}