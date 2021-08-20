import React from 'react'
import { startOfToday } from 'date-fns/esm'

const PlantUpdating: React.FC<any> = ({ submit, setUpdateLastWater }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const maxDate = new Date(date).toISOString().split('T')[0]

	return (
		<>
			<form onSubmit={(e) => submit(e)}>
				<div className="form-line lastwater">
					<label htmlFor="date">Last Water</label><input
						name="date"
						type="date"
						max={maxDate}
						onChange={(e) => setUpdateLastWater(e.target.value)} />
				</div>
				<div className="form-submit">
					<button className="submit" type="submit">Submit</button>
				</div>
			</form>

		</>
	)
}

export default PlantUpdating