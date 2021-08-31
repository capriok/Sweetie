import React from 'react'

const TaskForm: React.FC<any> = ({ submit, name, setName, pinned, setPinned }) => {
	return (
		<form onSubmit={(e) => submit(e)}>
			<div className="form-line name">
				<label htmlFor="name">Name</label>
				<input
					name="name"
					type="text"
					value={name}
					placeholder="Task"
					autoFocus={true}
					autoComplete="off"
					onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="form-line pinned">
				<label htmlFor="pinned">Pinned</label>
				<input
					type="checkbox"
					checked={pinned}
					onChange={(e) => setPinned(e.target.checked)} />
			</div>
			<div className="form-submit">
				<button className="submit" type="submit">Submit</button>
			</div>
		</form>

	)
}

export default TaskForm