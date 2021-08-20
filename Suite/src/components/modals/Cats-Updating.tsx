import React from 'react'
import { startOfToday } from 'date-fns';

const CatsUpdating: React.FC<any> = ({ submit, lfd, setLfd, lwd, setLwd }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const maxDate = new Date(date).toISOString().split('T')[0]

	return (
		<form onSubmit={(e) => submit(e)} className="cats">
			<div className="form-line food">
				<label htmlFor="food">Food Day</label>
				<input
					type="date"
					max={maxDate}
					value={new Date(lfd).toISOString().split('T')[0]}
					onChange={(e) => setLfd(e.target.value)} />
			</div>
			<div className="form-line waste">
				<label htmlFor="waste">Litter Change</label>
				<input
					type="date"
					max={maxDate}
					value={new Date(lwd).toISOString().split('T')[0]}
					onChange={(e) => setLwd(e.target.value)} />
			</div>
			<div className="form-submit">
				<button className="submit" type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CatsUpdating