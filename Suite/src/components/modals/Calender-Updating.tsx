import React from 'react'
import { addDays, startOfToday } from 'date-fns'

const CalenderUpdating: React.FC<any> = ({ submit, updateTimed, setUpdateTimed, setUpdateDate }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const minDate = addDays(new Date(date), 1).toISOString().split('T')[0]

	return (
		<form onSubmit={(e) => submit(e)} >
			<div className="form-line timed">
				<label htmlFor="timed">Timed</label>
				<input
					name="timed"
					type="checkbox"
					checked={updateTimed}
					onChange={(e) => {
						setUpdateDate(undefined)
						setUpdateTimed(e.target.checked)
					}} />
			</div>
			<div className="form-line date">
				<label htmlFor="date">Date</label>
				<input
					name="date"
					type={updateTimed ? "datetime-local" : "date"}
					min={minDate}
					onChange={(e) => setUpdateDate(e.target.value)} />
			</div>
			<div className="form-submit">
				<button type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CalenderUpdating