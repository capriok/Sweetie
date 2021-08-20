import React from 'react'
import { addDays, startOfDay, startOfToday } from 'date-fns'

const CatsUpdating: React.FC<any> = ({ submit, lfd, setLfd, lwd, setLwd }) => {
	return (
		<form onSubmit={(e) => submit(e)} className="cats">
			<div className="form-line food">
				<label htmlFor="food">Food Day</label>
				<input
					type="date"
					max={new Date(startOfToday()).toISOString().split('T')[0]}
					value={new Date(lfd).toISOString().split('T')[0]}
					onChange={(e) => setLfd(addDays(startOfDay(new Date(e.target.value)), 1))} />
			</div>
			<div className="form-line waste">
				<label htmlFor="waste">Litter Change</label>
				<input
					type="date"
					max={new Date(startOfToday()).toISOString().split('T')[0]}
					value={new Date(lwd).toISOString().split('T')[0]}
					onChange={(e) => setLwd(addDays(startOfDay(new Date(e.target.value)), 1))} />
			</div>
			<div className="form-submit">
				<button className="submit" type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CatsUpdating