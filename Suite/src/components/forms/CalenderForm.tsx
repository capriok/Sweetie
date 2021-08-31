import React from 'react'
import { addDays } from 'date-fns'
import { startOfToday } from 'date-fns/esm'

const CalenderForm: React.FC<any> = ({ submit, form, setform }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const minDate = addDays(new Date(date), 1).toISOString().split('T')[0]

	return (
		<form onSubmit={(e) => submit(e)} >
			{form.hasOwnProperty('name') &&
				<div className="form-line name">
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						value={form.name}
						placeholder="Name"
						autoFocus={true}
						autoComplete="off"
						onChange={(e) => setform({ ...form, name: e.target.value })} />
				</div>
			}
			<div className="form-line date">
				<label htmlFor="date">Date</label>
				<input
					name="date"
					type="date"
					min={minDate}
					onChange={(e) => setform({ ...form, date: e.target.value })} />
			</div>
			<div className="form-line timed">
				<label htmlFor="timed">Timed</label>
				<input
					name="timed"
					type="checkbox"
					checked={form.timed}
					onChange={(e) => setform({ ...form, timed: e.target.checked })} />
			</div>
			{form.timed && <>
				<div className="form-line time">
					<label htmlFor="date">Start</label>
					<input
						name="date"
						type="time"
						onChange={(e) => setform({ ...form, startTime: e.target.value })} />
				</div>
				<div className="form-line time">
					<label htmlFor="date">End</label>
					<input
						name="date"
						type="time"
						onChange={(e) => setform({ ...form, endTime: e.target.value })} />
				</div>
			</>}
			<div className="form-submit">
				<button type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CalenderForm