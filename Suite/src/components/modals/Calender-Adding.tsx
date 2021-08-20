import React from 'react'
import { addDays } from 'date-fns'
import { startOfToday } from 'date-fns/esm'

const CalenderAdding: React.FC<any> = ({ submit, name, setName, timed, setTimed, setDate }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const minDate = addDays(new Date(date), 1).toISOString().split('T')[0]

	return (
		<form onSubmit={(e) => submit(e)} >
			<div className="form-line name">
				<label htmlFor="name">Name</label>
				<input
					name="name"
					type="text"
					placeholder="Event name"
					autoComplete="off"
					value={name}
					onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="form-line timed">
				<label htmlFor="timed">Timed</label>
				<input
					name="timed"
					type="checkbox"
					checked={timed}
					onChange={(e) => {
						setDate(undefined)
						setTimed(e.target.checked)
					}} />
			</div>
			<div className="form-line date">
				<label htmlFor="date">Date</label>
				<input
					name="date"
					type={timed ? "datetime-local" : "date"}
					min={minDate}
					onChange={(e) => setDate(e.target.value)} />
			</div>
			<div className="form-submit">
				<button type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CalenderAdding