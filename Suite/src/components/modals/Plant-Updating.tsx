import { startOfToday } from 'date-fns'
import React from 'react'

const PlantUpdating: React.FC<any> = ({ submit, updateLastWater, setUpdateLastWater }) => {
	return (
		<>
			<form onSubmit={(e) => submit(e)}>
				<div className="form-line lastwater">
					<label htmlFor="date">Last Water</label><input
						name="date"
						type="date"
						max={new Date(startOfToday()).toISOString().split('T')[0]}
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