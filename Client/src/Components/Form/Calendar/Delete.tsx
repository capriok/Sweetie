import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'app'
import { FormatEventTimes } from 'Helpers/TimeHelp'
import Api from 'api'

import PageItem from 'Components/Page/Item'

import 'Styles/components/form/form.scss'

const CalendarDelete: React.FC = () => {
	const { socket, state } = useContext(AppContext)

	const [eventList, setEventList] = useState<Array<CalendarEvent>>([])

	useEffect(() => {
		const filteredList = filterEvents(state!.calendarEvents)
		setEventList(filteredList)
	}, [state!.calendarEvents])

	async function deleteClick(event: CalendarEvent) {
		const confirmation = window.confirm(`Remove '${event.name}' ?`);

		if (confirmation) {
			Api.RemoveCalendarEvent(event).then(ce => {
				setEventList(ce)
				socket!.emit('calendar-change', ce)
			})
		}
	}

	return (
		<div id="form" className="no-form-bg">
			<div className="form-wrap">
				<div className="calendar">
					{eventList.map((event, i) => (
						<div key={i} className="event">
							<PageItem
								className="event-wrap"
								onClick={() => deleteClick(event)}>
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
			</div>
		</div>
	)
}

export default CalendarDelete

function filterEvents(ce: Array<CalendarEvent>) {
	const events = ce.filter((ce) => {
		const eventDate = new Date(ce.date).getTime()
		const todayDate = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate() - 1
		).getTime()

		return eventDate > todayDate && ce
	})
	return events
}