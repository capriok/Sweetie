import React from 'react'
import { startOfToday } from 'date-fns/esm'

const PlantForm: React.FC<any> = ({ submit, form, setForm }) => {
	const date = startOfToday()
	date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
	const maxDate = new Date(date).toISOString().split('T')[0]

	return (
		<>
			<form onSubmit={(e) => submit(e)}>
				{form.hasOwnProperty('name') &&
					<div className="form-line name">
						<label htmlFor="name">Name</label>
						<input
							name="name"
							type="text"
							value={form.name}
							placeholder="Name"
							autoFocus={true}
							autoComplete="off"
							onChange={(e) => setForm({ ...form, name: e.target.value })} />
					</div>
				}
				<div className="form-line">
					<label htmlFor="cycle">Cycle</label>
					<input
						name="cycle"
						type="number"
						min={3}
						value={form.cycle}
						placeholder="Cycle"
						onChange={(e) => setForm({ ...form, cycle: parseInt(e.target.value) })} />
				</div>
				<div className="form-line last">
					<label htmlFor="date">Last Water</label>
					<input
						name="date"
						type="date"
						max={maxDate}
						onChange={(e) => setForm({ ...form, last: e.target.value })} />
				</div>
				<div className="form-submit">
					<button className="submit" type="submit">Submit</button>
				</div>
			</form>
		</>
	)
}

export default PlantForm