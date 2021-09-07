import React from 'react'

const TaskForm: React.FC<any> = ({ submit, form, setForm }) => {
	return (
		<form onSubmit={(e) => submit(e)}>
			<div className="form-line name">
				<label htmlFor="name">Name</label>
				<input
					name="name"
					type="text"
					value={form.name}
					placeholder="Task"
					autoFocus={true}
					autoComplete="off"
					onChange={(e) => setForm({ ...form, name: e.target.value })} />
			</div>
			<div className="form-line pinned">
				<label htmlFor="pinned">Pinned</label>
				<input
					type="checkbox"
					checked={form.pinned}
					onChange={(e) => setForm({ ...form, pinned: e.target.checked })} />
			</div>
			<div className="form-submit">
				<button className="submit" type="submit">Submit</button>
			</div>
		</form>

	)
}

export default TaskForm