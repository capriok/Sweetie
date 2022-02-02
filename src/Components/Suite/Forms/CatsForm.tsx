import React, { useState } from 'react'
import { startOfToday } from 'date-fns';

const INITIAL_FORM = {
	lfd: undefined,
	lwd: undefined
}

const CatsForm: React.FC<any> = ({ submit }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const maxDate = new Date(date).toISOString().split('T')[0]

	const [form, setForm] = useState<any>(INITIAL_FORM)

	return (
		<form onSubmit={(e) => submit(e)} className="cats">
			<div className="form-line food">
				<label htmlFor="food">Food Day</label>
				<input
					type="date"
					max={maxDate}
					value={new Date(form.lfd).toISOString().split('T')[0]}
					onChange={(e) => setForm({ ...form, lfd: e.target.value })} />
			</div>
			<div className="form-line waste">
				<label htmlFor="waste">Litter Change</label>
				<input
					type="date"
					max={maxDate}
					value={new Date(form.lwd).toISOString().split('T')[0]}
					onChange={(e) => setForm({ ...form, lwd: e.target.value })} />
			</div>
			<div className="form-submit">
				<button className="submit" type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CatsForm