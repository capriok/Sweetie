import React, { useState, useEffect } from 'react'
import { startOfToday } from 'date-fns'
import { formatEventTimes, tzZero } from '../../../Helpers/TimeHelp'

import { SwtReducerActions } from '../../../state'
import Api from '../../../api'
import Form from '../Components/Form'
import CalendarForm from '../Forms/CalendarForm'
import ActionBar, { ActionBarButton } from '../Components/ActionBar'

import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc'
import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../../Styles/Suite/tabs/calendar-tab.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

interface FormState {
	name?: string
	item?: CalendarEvent
	timed: boolean
	dates?: Array<string | undefined>
	date?: string
	startTime?: string
	endTime?: string
}

const InitAddingForm: FormState = {
	name: '',
	timed: false,
	dates: [undefined],
	startTime: undefined,
	endTime: undefined
}

const InitUpdatingForm: FormState = {
	name: '',
	item: undefined,
	timed: false,
	date: undefined,
	startTime: undefined,
	endTime: undefined
}

const CalendarTab: React.FC<Props> = (props) => {
	const { socket, state, dispatch } = props

	const [isAdding, setAddingState] = useState(false)
	const [isUpdating, setUpdatingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [eventList, setEventList] = useState<Array<CalendarEvent>>([])
	const [addingForm, setAddingForm] = useState(InitAddingForm)
	const [updatingForm, setUpdatingForm] = useState(InitUpdatingForm)

	const toggleAdding = () => setAddingState(s => !s)
	const toggleUpdating = () => setUpdatingState(s => !s)
	const toggleRemoving = () => setRemovingState(s => !s)

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

	function resetAddingState() {
		setAddingForm(InitAddingForm)
		setAddingState(false)
	}

	function resetUpdatingState() {
		setUpdatingForm(InitUpdatingForm)
		setUpdatingState(false)
	}

	function setUpdatingFormItem(event: CalendarEvent) {
		const d = new Date(event.date)
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
		const formattedDate = d.toISOString().split('T')[0]

		setUpdatingForm({
			...updatingForm,
			item: event,
			name: event.name,
			timed: event.timed,
			date: formattedDate,
			startTime: event.startTime,
			endTime: event.endTime,
		})
	}

	async function RemoveEvent(event: CalendarEvent) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${event.name}' ?`);
		if (confirmation) {
			Api.RemoveCalendarEvent(event).then(ce => {
				socket.emit('ce-change', ce)
				setEventList(ce)
			})
		}
	}

	function HandlePostForm(e: any) {
		e.preventDefault()
		console.log(addingForm);
		addingForm!.dates?.forEach(async date => await PostEvent(date!))
	}

	async function PostEvent(dateString: string) {
		const invalidDate = !isNaN(Date.parse(dateString!))

		if (!isAdding || !addingForm.name || !invalidDate) return
		if (addingForm.timed && !addingForm.startTime) return

		const date = new Date(dateString)

		let event = {
			name: addingForm.name,
			date: date.toJSON(),
			timed: addingForm.timed,
			startTime: addingForm.startTime || '',
			endTime: addingForm.endTime || ''
		}

		console.log(event);
		Api.PostCalendarEvent(event).then(ce => {
			resetAddingState()
			socket.emit('ce-change', ce)
			dispatch({ type: SwtReducerActions.SETCE, value: ce })
		})
	}

	async function UpdateEvent(e: any) {
		e.preventDefault()

		if (isUpdating && (updatingForm.timed && !updatingForm.startTime)) return

		const date = new Date(updatingForm.date!)
		const event = {
			id: updatingForm.item?._id,
			name: updatingForm.name,
			timed: updatingForm.timed,
			date: updatingForm.item?.date,
			startTime: updatingForm.item?.startTime,
			endTime: updatingForm.item?.endTime,
		}

		if (updatingForm.date) event.date = date.toJSON()
		if (updatingForm.startTime !== event.startTime) event.startTime = updatingForm.startTime
		if (updatingForm.endTime !== event.endTime) event.endTime = updatingForm.endTime

		console.log(event);
		Api.UpdateCalendarEvent(event).then(ce => {
			resetUpdatingState()
			socket.emit('ce-change', ce)
			dispatch({ type: SwtReducerActions.SETCE, value: ce })
		})
	}

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
		<>
			<div className="section-scroll">
				{(() => {

					if (isAdding) return (
						<Form title="Add Event">
							<CalendarForm
								submit={HandlePostForm}
								form={addingForm}
								setForm={setAddingForm} />
						</Form>
					)

					if (isUpdating && updatingForm.item) return (
						<Form title={`Update ${updatingForm.item.name}`}>
							<CalendarForm
								submit={UpdateEvent}
								form={updatingForm}
								setForm={setUpdatingForm} />
						</Form>
					)

					if (!eventList.length) return (
						<p>No Future Events</p>
					)

					return (
						<div className="calendar-tab content">
							<div className="content-head">
								<p>Event</p>
								<p>Date / Time</p>
							</div>
							{eventList.map((event, i) => {
								const inPast = tzZero(event.date).toJSON() < tzZero(startOfToday()).toJSON()
								return (
									<div className="content-cont" key={i}>
										<div className="month-line">{displayMonth(i)}</div>
										{inPast
											? <></>
											: <div
												className={"content-line with-border"}
												onClick={() => {
													return isRemoving
														? RemoveEvent(event)
														: isUpdating && !updatingForm.item
															? setUpdatingFormItem(event)
															: null
												}}>
												<div className="name">
													<p>{event.name}</p>
												</div>
												<div className="date-time">
													<span className="date">
														{event.timed
															? new Date(event.date).toLocaleDateString('en-us',
																{ weekday: 'short', month: 'short', day: 'numeric' })
															: new Date(event.date).toLocaleDateString('en-us',
																{ weekday: 'short', month: 'long', day: 'numeric' })}
													</span>
													<span className="time">
														{`${event.timed ? `, ${formatEventTimes(event)}` : ''}`}
													</span>
												</div>
											</div>
										}
									</div>
								)
							})}
						</div>
					)
				})()}
			</div>

			<ActionBar>
				<ActionBarButton
					is={isAdding}
					click={toggleAdding}
					cancel={resetAddingState}
					render={<VscDiffAdded />} />
				<ActionBarButton
					is={isUpdating}
					click={toggleUpdating}
					cancel={resetUpdatingState}
					render={<MdSystemUpdateAlt />} />
				<ActionBarButton
					is={isRemoving}
					click={toggleRemoving}
					cancel={toggleRemoving}
					render={<VscDiffRemoved />} />
			</ActionBar>
		</>
	)
}

export default CalendarTab