import React, { useEffect, useState } from 'react'
import { formatEventTimes } from 'Helpers/TimeHelp'

import ViewItem from '../Components/View/Item'

import 'Styles/Suite/views/calendar.scss'

const Calendar: React.FC<any> = (props) => {
	console.log(props);

	const { state, dispatch } = props

	const [eventList, setEventList] = useState<Array<CalendarEvent>>([])

	useEffect(() => {
		const filteredList = state.calendarEvents.filter((ce: CalendarEvent) => {
			const eventDate = new Date(ce.date).getTime()
			const todayDate = new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate() - 1
			).getTime()

			return eventDate > todayDate && ce
		})
		setEventList(filteredList)
	}, [state.calendarEvents])

	function displayMonth(i: number) {
		const currEv = eventList[i]
		const currMonth = new Date(currEv.date).toLocaleString('default', { month: 'long' })

		const monthName = <p>{currMonth}</p>

		const prevEv = eventList[i - 1]
		if (!prevEv) return monthName

		const prevMonth = new Date(prevEv.date).toLocaleString('default', { month: 'long' })

		return prevMonth !== currMonth ? monthName : ''
	}

	return (
		<div className="calendar">
			{eventList.map((event, i) => (
				<div key={i} className="event">
					<div className="month-wrap">{displayMonth(i)}</div>
					<ViewItem className="event-wrap">
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
	)
}

export default Calendar