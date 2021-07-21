import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './slide-modal'
import Api from '../api'

export type Task = {
	name: string
	pinned: boolean
}

const Tasks: React.FC = () => {
	const [is, set] = useState({
		adding: false,
		removing: false
	})

	const [taskList, setTaskList] = useState<Array<Task>>([])
	const [name, setName] = useState('')
	const [pinned, setPinned] = useState(false)

	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!is.adding) return
		set({ adding: false, removing: false })
	})


	function AddBtnClick() {
		set({ ...is, adding: !is.adding })
	}

	async function RemoveBtnClick() {
		set({ ...is, removing: !is.removing })
	}

	function ClearBtnClick() {
		const confirmation = window.confirm('Are You Sure?');
		if (confirmation) {
			Api.ClearTaskList().then(tl => setTaskList(tl))
		}
	}

	async function removeTask(task: Task) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove '${task.name}'?`);
		if (confirmation) {
			Api.RemoveTask(task).then(tl => setTaskList(tl))
		}
	}

	async function postTask(e: any) {
		e.preventDefault()
		if (!is.adding || !name) return

		let task = { name: name, pinned: pinned }

		console.log(task);

		Api.PostTask(task).then(tl => setTaskList(tl))
	}

	useEffect(() => {
		(async () => Api.GetTaskList().then(tl => setTaskList(tl)))()
	}, [])

	useEffect(() => {
		taskList.length && console.log({ TaskList: taskList })
	}, [taskList])

	return (
		<>
			<section>
				<h1>Tasks</h1>
				{!taskList.length
					? <div>Nothing here.</div>
					: <div className="content">
						{taskList.some(t => t.pinned) &&
							<>
								<h3>Pinned</h3>
								{taskList.filter(t => t.pinned).map((task, i) => (
									<p
										key={i}
										className="task"
										onClick={() => removeTask(task)}>
										<strong>{task.name}</strong>
									</p>
								))}
							</>
						}
						{taskList.some(t => !t.pinned) &&
							<>
								<h3>General</h3>
								{taskList.filter(t => !t.pinned).map((task, i) => (
									<p
										key={i}
										className="task"
										onClick={() => removeTask(task)}>
										{task.name}
									</p>
								))}
							</>
						}
					</div>
				}
				<div className="action-btns">
					<button onClick={AddBtnClick} disabled={is.removing}>Add</button>
					<button onClick={RemoveBtnClick}>{is.removing ? 'Done' : 'Remove'}</button>
					<button onClick={ClearBtnClick} disabled={is.removing}>Clear</button>
				</div>
			</section>
			{is.adding &&
				<SlideModal smref={modalRef} close={() => set({ ...is, adding: false })} title="Add Chore">
					<form onSubmit={(e) => postTask(e)} className="chores">
						<input
							type="text"
							placeholder="Task"
							onChange={(e) => setName(e.target.value)} />
						<label className="pinned">
							<span>Pinned</span>
							<input
								type="checkbox"
								checked={pinned}
								onChange={(e) => setPinned(e.target.checked)} />
						</label>
						<button className="submit" type="submit">Submit</button>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default Tasks