import React, { useContext, useState } from 'react'
import { AppContext } from 'app'
import { useNavigate } from 'react-router'
import Api from 'api'

import 'Styles/components/form/form.scss'

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

const CalendarPost: React.FC = () => {
	const { socket } = useContext(AppContext)

	const navigate = useNavigate()

	const [form, setForm] = useState<any>(INITIAL_FORM)

	function submitClick(e: any) {
		e.preventDefault()
		new Promise((resolve) => form.dates.forEach((date: any, i: number) => {
			submit(date)
			if (i === form.dates.length - 1) resolve('Done')
		})
		).then(() => navigate(-1))
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

		console.log(event)
		Api.PostCalendarEvent(event).then(ce => {
			socket!.emit('calendar-change', ce)
		})
	}

	return (
		<div id="form">
			<div className="form-wrap">
				<form onSubmit={(e) => submitClick(e)} >
					<div className="form-line name">
						<label>Name</label>
						<input
							type="text"
							autoComplete="off"
							autoCorrect="off"
							placeholder="Name"
							value={form.name}
							onChange={(e) => setForm({ ...form, name: e.target.value })} />
					</div>
					{form.dates.map((date: string, i: number) =>
						<div key={i} className="form-line date">
							<label>Date</label>
							<input
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
						<label>Dates +/-</label>
						{form.dates.length !== 1 &&
							<button
								type="button"
								className="minus-button"
								tabIndex={-1}
								onClick={() => {
									form.dates.pop()
									setForm({
										...form, dates: form.dates
									})
								}}
							>-</button>
						}
						<button
							type="button"
							className="add-button"
							tabIndex={-1}
							onClick={() => {
								if (form.dates[form.dates.length - 1] === undefined) return
								setForm({
									...form, dates: [...form.dates, undefined]
								})
							}}
						>+</button>
					</div>
					<div className="form-line timed">
						<label>Timed</label>
						<input
							type="checkbox"
							checked={form.timed}
							onChange={(e) => setForm({ ...form, timed: e.target.checked })} />
					</div>
					{form.timed && <>
						<div className="form-line start-time">
							<label>Start</label>
							<input
								type="time"
								value={form.startTime}
								onChange={(e) => {
									console.log(e.target.value);
									setForm({ ...form, startTime: e.target.value })
								}} />
						</div>
						<div className="form-line end-time">
							<label>End</label>
							<input
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