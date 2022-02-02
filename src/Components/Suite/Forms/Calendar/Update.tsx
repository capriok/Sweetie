import React, { useState } from 'react'
import Api from 'api'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
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
	const { socket, dispatch } = props

	const [form, setForm] = useState<any>(INITIAL_FORM)

	function submitClick(e: any) {
		e.preventDefault()
		console.log(form)
		form!.dates?.forEach(async (date: any) => await submit(date!))
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

		console.log(event);
		Api.UpdateCalendarEvent(event).then(ce => {
			socket.emit('ce-change', ce)
			dispatch({ type: SwtReducerActions.SETCE, value: ce })
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Update</div>
				<form onSubmit={(e) => submitClick(e)} >
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
	)
}

export default CalendarUpdate