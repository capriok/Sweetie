import React, { useEffect, useState } from 'react'
import Api from '../api'

export type Task = {
	name: string
	pinned: boolean
}
const TaskList: React.FC = () => {

	const [taskList, setTaskList] = useState<Array<Task>>([])

	const [editing, toggleEdit] = useState(false)

	function AddBtnClick() {

	}

	async function RemoveBtnClick() {
		toggleEdit(!editing)
	}

	async function removeTask(task: Task) {
		if (!editing) return

		const confirmation = window.confirm('Are You Sure?');
		if (confirmation) {
			const list: any = await Api.RemoveTask(task)
			setTaskList(list)
		}

	}

	function ClearBtnClick() {
		const confirmation = window.confirm('Are You Sure?');
		if (confirmation) {
			Api.ClearTaskList().then(gl => setTaskList(gl))
		}
	}

	useEffect(() => {
		(async () => {
			const list: any = await Api.GetTaskList()
			setTaskList(list)
		})()
	}, [])

	useEffect(() => {
		console.log(taskList)
	}, [taskList])
	return (
		<section>
			<h1>Task List</h1>
			<div className="list">
				{taskList.map((task, i) => (
					<p
						key={i}
						className="task"
						onClick={() => removeTask(task)}>
						{task.name}
					</p>
				))}
			</div>
			<br />
			<div className="buttons">
				<button onClick={AddBtnClick} disabled={editing}>Add</button>
				<button onClick={RemoveBtnClick}>{editing ? 'Done' : 'Remove'}</button>
				<button onClick={ClearBtnClick} disabled={editing}>Clear</button>
			</div>
		</section>
	)
}

export default TaskList