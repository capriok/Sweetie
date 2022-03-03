import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, MotionProps } from 'framer-motion'
import { FormatEventTimes } from 'Helpers/TimeHelp'
import Api from 'api'

import PageItem from 'Components/Page/Item'

import 'Styles/components/form/form.scss'

interface Props {
	socket: Socket
	state: SwtState
}

interface FormState {
	name?: string
	item?: CalendarEvent
	timed: boolean
	date?: string
	startTime?: string
	endTime?: string
}

const INITIAL_FORM: FormState = {
	name: '',
	item: undefined,
	timed: false,
	date: undefined,
	startTime: undefined,
	endTime: undefined
}

const CalendarUpdate: React.FC<Props> = (props) => {
	const { socket, state } = props

	const navigate = useNavigate()

	const [eventList, setEventList] = useState<Array<CalendarEvent>>([])

	useEffect(() => {
		const filteredList = filterEvents(state.calendarEvents)
		setEventList(filteredList)
	}, [state.calendarEvents])

	const [event, setEvent] = useState<any>(null)
	const [form, setForm] = useState<any>(INITIAL_FORM)

	function setUpdatingEvent(event: CalendarEvent) {
		const formattedDate = new Date(event.date).toJSON().split('T')[0]

		setEvent(event)
		setForm({
			...form,
			item: event,
			name: event.name,
			timed: event.timed,
			date: formattedDate,
			startTime: event.startTime,
			endTime: event.endTime,
		})
	}

	async function submit(e: any) {
		e.preventDefault()

		if ((form.timed && !form.startTime)) return

		const date = new Date(form.date!)
		const event = {
			id: form.item?._id,
			name: form.name,
			timed: form.timed,
			date: form.item?.date,
			startTime: form.item?.startTime,
			endTime: form.item?.endTime,
		}

		if (form.date) event.date = date.toJSON()
		if (form.startTime !== event.startTime) event.startTime = form.startTime
		if (form.endTime !== event.endTime) event.endTime = form.endTime

		console.log(event)
		Api.UpdateCalendarEvent(event).then(ce => {
			socket.emit('calendar-change', ce)
			navigate(-1)
		})
	}

	const slideDownProps: MotionProps = {
		initial: 'hidden',
		transition: {
			duration: .5,
		},
		style: { width: '100%', },
		variants: {
			hidden: { opacity: 0, y: -40 },
			visible: { opacity: 1, y: 0 }
		}
	}

	return (
		<>
			<motion.div {...slideDownProps} animate={!event ? 'visible' : 'hidden'}>
				{!event &&
					<div id="form" className="no-form-bg">
						<div className="form-wrap">
							<div className="title no-mt">Choose Event</div>
							<div className="calendar">
								{eventList.map((event, i) => (
									<div key={i} className="event" onClick={() => setUpdatingEvent(event)}>
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
						</div>
					</div>
				}
			</motion.div>
			<motion.div {...slideDownProps} animate={event ? 'visible' : 'hidden'}>
				{event &&
					<div id="form">
						<div className="form-wrap">
							<div className="title">Update Event</div>
							<form onSubmit={(e) => submit(e)}>
								<div className="form-line name">
									<label htmlFor="name">Name</label>
									<input
										name="name"
										type="text"
										autoFocus={true}
										autoComplete="off"
										placeholder="Name"
										value={form.name}
										onChange={(e) => setForm({ ...form, name: e.target.value })} />
								</div>
								<div className="form-line date">
									<label htmlFor="date">Date</label>
									<input
										name="date"
										type="date"
										value={form.date}
										onChange={(e) => setForm({ ...form, date: e.target.value })} />
								</div>
								<div className="form-line timed">
									<label htmlFor="timed">Timed</label>
									<input
										name="timed"
										type="checkbox"
										checked={form.timed}
										onChange={(e) => setForm({ ...form, timed: e.target.checked })} />
								</div>
								{form.timed && <>
									<div className="form-line start-time">
										<label htmlFor="start-time">Start</label>
										<input
											name="start-time"
											type="time"
											value={form.startTime}
											onChange={(e) => {
												console.log(e.target.value);
												setForm({ ...form, startTime: e.target.value })
											}} />
									</div>
									<div className="form-line end-time">
										<label htmlFor="start-time">End</label>
										<input
											name="end-time"
											type="time"
											value={form.endTime}
											onChange={(e) => {
												console.log(e.target.value);
												const nullTime = e.target.value === ''
												setForm({ ...form, endTime: nullTime ? undefined : e.target.value })
											}} />
									</div>
								</>}
								<div className="form-submit">
									<button type="submit">Submit</button>
								</div>
							</form>
						</div>
					</div>

				}
			</motion.div>
		</>
	)
}

export default CalendarUpdate

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

