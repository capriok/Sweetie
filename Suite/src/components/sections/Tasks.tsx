import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'

import Api from '../../api'
import Modal from '../Modal'
import TaskAdding from '../modals/Task-Adding'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

import '../../styles/sections/tasks.scss'

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

		console.log(task);
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
			<div className="section-scroll" ref={outClickRef}>
				{!taskList.length
					? <div className="content-empty" ><p>Nothing here.</p></div>
					: <div className="tasks content">
						{taskList.length &&
							taskList.map((task, i) => (
								<div
									key={i}
									className="content-line task"
									onClick={() => removeTask(task)}>
									<p
										className={task.pinned ? 'pin' : ''}>{task.name}</p>
								</div>
							))
						}
					</div>
				}
				<div className="static-tasks content">
					<h3>Weekly</h3>
					{staticTasks.map((task, i: number) => (
						<div key={i} className="content-line with-border">
							<p className="weekday">{task.weekday}</p>
							<p className="name">{task.name}</p>
						</div>
					))}
				</div>
			</div>

			<ActionBar actives={[
				{ is: is.adding, cb: AddBtnClick },
				{ is: is.removing, cb: RemoveBtnClick },
			]}>
				<ActionBarButton click={AddBtnClick} render={<VscDiffAdded />} />
				<ActionBarButton click={RemoveBtnClick} render={<VscDiffRemoved />} />
				<ActionBarButton click={ClearBtnClick} render={<VscDebugStop />} />
			</ActionBar>

			{is.adding &&
				<Modal
					title="Add Task"
					mref={outClickRef}>
					<TaskAdding
						submit={postTask}
						name={name}
						setName={setName}
						pinned={pinned}
						setPinned={setPinned} />
				</Modal>
			}
		</>
	)
}

export default Tasks