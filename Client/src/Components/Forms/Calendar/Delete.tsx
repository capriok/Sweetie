import React, { useEffect, useState } from 'react'
import { FormatEventTimes } from 'Helpers/TimeHelp'
import Api from 'api'

import ViewItem from 'Components/View/Item'

import 'Styles/components/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
}

const CalendarDelete: React.FC<Props> = (props) => {
	const { socket, state } = props

	const [eventList, setEventList] = useState<Array<CalendarEvent>>([])

	useEffect(() => {
		const filteredList = filterEvents(state.calendarEvents)
		setEventList(filteredList)
	}, [state.calendarEvents])

	async function deleteClick(event: CalendarEvent) {
		const confirmation = window.confirm(`Remove '${event.name}' ?`);

		if (confirmation) {
			Api.RemoveCalendarEvent(event).then(ce => {
				socket.emit('calendar-change', ce)
				setEventList(ce)
			})
		}
	}

	return (
		<div id="form" className="no-form-bg">
			<div className="form-wrap">
				<div className="title no-mt">Delete Events</div>
				<div className="calendar">
					{eventList.map((event, i) => (
						<div key={i} className="event">
							<ViewItem
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
							</ViewItem>
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