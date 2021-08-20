import React from 'react'
import { startOfToday } from 'date-fns/esm'

const PlantAdding: React.FC<any> = ({ submit, name, setName, cycle, setCycle, setLastWater }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const maxDate = new Date(date).toISOString().split('T')[0]

	return (
		<>
			<form onSubmit={(e) => submit(e)}>
				<div className="form-line name">
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						value={name}
						placeholder="Name"
						autoComplete="off"
						onChange={(e) => setName(e.target.value)} />
				</div>
				<div className="form-line">
					<label htmlFor="cycle">Cycle</label>
					<input
						name="cycle"
						type="number"
						min={3}
						value={cycle}
						placeholder="Cycle"
						onChange={(e) => setCycle(parseInt(e.target.value))} />
				</div>
				<div className="form-line lastwater">
					<label htmlFor="date">Last Water</label>
					<input
						name="date"
						type="date"
						max={maxDate}
						onChange={(e) => setLastWater(e.target.value)} />
				</div>
				<div className="form-submit">
					<button className="submit" type="submit">Submit</button>
				</div>
			</form>
		</>
	)
}

export default PlantAdding