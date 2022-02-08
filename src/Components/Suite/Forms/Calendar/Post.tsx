import React, { useState } from 'react'
import Api from 'api'

import 'Styles/Suite/forms/form.scss'

interface Props {
	socket: Socket
	state: SwtState
	closeForm: () => React.SetStateAction<any>
}

interface FormState {
	name?: string
	item?: CalendarEvent
	timed: boolean
	dates?: Array<string | undefined>
	startTime?: string
	endTime?: string
}

const INITIAL_FORM: FormState = {
	name: '',
	timed: false,
	dates: [new Date().toJSON().split('T')[0]],
	startTime: undefined,
	endTime: undefined
}

const CalendarPost: React.FC<Props> = (props) => {
	const { socket, closeForm } = props

	const [form, setForm] = useState<any>(INITIAL_FORM)

	function submitClick(e: any) {
		e.preventDefault()
		new Promise((resolve) => form.dates.forEach((date: any, i: number) => {
			submit(date)
			if (i === form.dates.length - 1) resolve('Done')
		})
		).then(() => closeForm())
	}

	function submit(dateString: string) {
		const invalidDate = !isNaN(Date.parse(dateString!))

		if (!form.name || !invalidDate) return
		if (form.timed && !form.startTime) return

		const date = new Date(dateString)

		let event = {
			name: form.name,
			date: date.toJSON(),
			timed: form.timed,
			startTime: form.startTime || '',
			endTime: form.endTime || ''
		}

		console.log(event);
		Api.PostCalendarEvent(event).then(ce => {
			socket.emit('ce-change', ce)
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<div className="title">Add Events</div>
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
					{form.dates.map((date: string, i: number) =>
						<div key={i} className="form-line date">
							<label htmlFor="date">Date</label>
							<input
								name="date"
								type="date"
								value={date}
								onChange={(e) => setForm({
									...form,
									dates: form.dates.map((d: string, index: number) => {
										if (index === i) d = e.target.value
										return d
									})
								})} />
						</div>
					)}
					<div className="form-line date">
						<label htmlFor="add-date">Dates +/-</label>
						<button
							type="button"
							name="add-date"
							className="add-button"
							tabIndex={-1}
							onClick={() => {
								if (form.dates[form.dates.length - 1] === undefined) return
								setForm({
									...form, dates: [...form.dates, undefined]
								})
							}}
						>+</button>
						{form.dates.length !== 1 &&
							<button
								type="button"
								name="delete-date"
								className="delete-button"
								tabIndex={-1}
								onClick={() => {
									form.dates.pop()
									setForm({
										...form, dates: form.dates
									})
								}}
							>-</button>
						}
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

export default CalendarPost