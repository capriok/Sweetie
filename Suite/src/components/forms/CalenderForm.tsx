import React from 'react'
const CalenderForm: React.FC<any> = ({ submit, form, setForm }) => {
	return (
		<form onSubmit={(e) => submit(e)} >
			{form.hasOwnProperty('name') &&
				<div className="form-line name">
					<label htmlFor="name">Name</label>
					<input
						name="name"
						type="text"
						autoFocus={true}
						autoComplete="off"
						placeholder="Name"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })} />
				</div>
			}
			<div className="form-line date">
				<label htmlFor="date">Date</label>
				<input
					name="date"
					type="date"
					value={form.date}
					onChange={(e) => setForm({ ...form, date: e.target.value })} />
			</div>
			<div className="form-line timed">
				<label htmlFor="timed">Timed</label>
				<input
					name="timed"
					type="checkbox"
					checked={form.timed}
					onChange={(e) => setForm({ ...form, timed: e.target.checked })} />
			</div>
			{form.timed && <>
				<div className="form-line start-time">
					<label htmlFor="start-time">Start</label>
					<input
						name="start-time"
						type="time"
						value={form.startTime}
						onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
				</div>
				<div className="form-line end-time">
					<label htmlFor="start-time">End</label>
					<input
						name="end-time"
						type="time"
						value={form.endTime}
						onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
				</div>
			</>}
			<div className="form-submit">
				<button type="submit">Submit</button>
			</div>
		</form>
	)
}

export default CalenderForm