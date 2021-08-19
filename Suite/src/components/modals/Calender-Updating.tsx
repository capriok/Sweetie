import React from 'react'
import { startOfToday } from 'date-fns'

const CalenderUpdating: React.FC<any> = ({ submit, updateTimed, setUpdateTimed, updateDate, setUpdateDate }) => {
	return (
		<form onSubmit={(e) => submit(e)} >
			<div className="form-line timed">
				<label htmlFor="timed">Timed</label>
				<input
					name="timed"
					type="checkbox"
					checked={updateTimed}
					onChange={(e) => setUpdateTimed(e.target.checked)} />
			</div>
			<div className="form-line date">
				<label htmlFor="date">Date</label>
				<input
					name="date"
					type={updateTimed ? "datetime-local" : "date"}
					value={updateTimed ?
						new Date(updateDate).toISOString()
						: new Date(updateDate).toISOString().split('T')[0]
					}
					min={new Date(startOfToday()).toISOString()}
					onChange={(e) => setUpdateDate(e.target.value)} />
			</div>
			<div className="form-submit">
				<button type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CalenderUpdating