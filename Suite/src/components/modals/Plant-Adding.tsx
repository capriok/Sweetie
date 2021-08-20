import React from 'react'
import { startOfToday } from 'date-fns'

const PlantAdding: React.FC<any> = ({ submit, setName, setCycle, setLastWater }) => {
	return (
		<>
			<form onSubmit={(e) => submit(e)}>
				<div className="form-line name">
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
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
						placeholder="Cycle"
						onChange={(e) => setCycle(parseInt(e.target.value))} />
				</div>
				<div className="form-line lastwater">
					<label htmlFor="date">Last Water</label>
					<input
						name="date"
						type="date"
						max={new Date(startOfToday()).toISOString().split('T')[0]}
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