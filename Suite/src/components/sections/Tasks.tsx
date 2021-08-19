import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import Modal from '../Modal'

import Api from '../../api'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

const Tasks: React.FC = () => {
	const [is, set] = useState({
		adding: false,
		removing: false
	})

	const [staticTasks, setStaticTasks] = useState<Array<StaticTask>>([])
	const [taskList, setTaskList] = useState<Array<Task>>([])
	const [name, setName] = useState('')
	const [pinned, setPinned] = useState(false)

	function ResetSetState() {
		set(() => ({ adding: false, removing: false }))
	}

	function ResetAddFormState() {
		setName('')
		setPinned(false)
	}

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!is.adding && !is.removing) return
		ResetSetState()
		ResetAddFormState()
	})

	function AddBtnClick() {
		set(is => ({ ...is, adding: !is.adding }))
	}

	async function RemoveBtnClick() {
		set(is => ({ ...is, removing: !is.removing }))
	}

	function ClearBtnClick() {
		const confirmation = window.prompt(
			'Did you complete everything?\n\n' +
			'Type \'confirm\' to clear Tasks.'
		);
		if (confirmation?.toLocaleLowerCase() === 'confirm') {
			Api.ClearTaskList().then(tl => setTaskList(tl))
		}
	}

	async function removeTask(task: Task) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove '${task.name}' ?`);
		if (confirmation) {
			Api.RemoveTask(task).then(tl => setTaskList(tl))
		}
	}

	async function postTask(e: any) {
		e.preventDefault()
		if (!name) return

		let task = { name: name, pinned: pinned }

		Api.PostTask(task).then(tl => {
			ResetAddFormState()
			setTaskList(tl)
		})
	}

	useEffect(() => {
		(async () => Api.GetTaskList().then(tl => {
			console.log({ TaskList: tl })
			setTaskList(tl)
		}))();
		(async () => Api.GetStaticTasks().then(st => {
			console.log({ StaticTasks: st })
			setStaticTasks(st)
		}))();
	}, [])

	return (
		<>
			<section ref={outClickRef}>
				<div className="content">
					{!taskList.length
						? <div>Nothing here.</div>
						: <>
							{taskList.length &&
								<>
									{taskList.map((task, i) => (
										<p
											key={i}
											className="task"
											onClick={() => removeTask(task)}>
											{task.pinned ? <strong>{task.name}</strong> : task.name}
										</p>
									))}
								</>
							}
						</>
					}
					<br />
					<h3>Weekly</h3>
					{staticTasks.map((task, i: number) => (
						<div key={i} className="static-task">
							<p>{task.weekday}</p>
							<p>{task.name}</p>
						</div>
					))}
				</div>
				{
					is.adding
						? <div className="action-btns">
							<button onClick={AddBtnClick}><VscDebugStop /></button>
						</div>
						: is.removing
							? <div className="action-btns">
								<button onClick={RemoveBtnClick}><VscDebugStop /></button>
							</div>
							: <div className="action-btns">
								<button onClick={AddBtnClick}><VscDiffAdded /></button>
								<button onClick={RemoveBtnClick}><VscDiffRemoved /></button>
								<button onClick={ClearBtnClick}><VscDebugStop /></button>
							</div>
				}
			</section>
			{is.adding &&
				<Modal
					title="Add Task"
					smref={outClickRef}
					close={() => ResetAddFormState()} >
					<form onSubmit={(e) => postTask(e)} className="tasks">
						<input
							name="name"
							type="text"
							placeholder="Task"
							autoComplete="off"
							value={name}
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
				</Modal>
			}
		</>
	)
}

export default Tasks