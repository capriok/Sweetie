import React, { useEffect, useState } from 'react'
import { SwtReducerActions } from 'state'
import { formatEventTimes } from 'Helpers/TimeHelp'
import Api from 'api'

import ViewItem from 'Components/Suite/Components/View/Item'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const CalendarDelete: React.FC<Props> = (props) => {
	const { socket, state, dispatch } = props

	const [eventList, setEventList] = useState<Array<CalendarEvent>>([])

	useEffect(() => {
		const filteredList = filterEvents(state.calendarEvents)
		setEventList(filteredList)
	}, [state.calendarEvents])

	async function deleteClick(event: CalendarEvent) {
		const confirmation = window.confirm(`Remove '${event.name}' ?`);

		if (confirmation) {
			Api.RemoveCalendarEvent(event).then(ce => {
				socket.emit('ce-change', ce)
				setEventList(ce)
				dispatch({ type: SwtReducerActions.SETCE, value: ce })
			})
		}
	}

	return (
		<div id="form" className="no-form-bg">
			<div className="form-wrap">
				<div className="title">Delete Events</div>
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
										{`${event.timed ? `, ${formatEventTimes(event)}` : ''}`}
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