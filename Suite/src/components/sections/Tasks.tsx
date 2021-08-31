import React, { useEffect, useState } from 'react'

import Api from '../../api'
import Form from '../Form'
import TaskForm from '../forms/TaskForm'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'

import '../../styles/sections/tasks.scss'

interface FormState {
	name: string
	pinned: boolean
}

const InitAddingForm: FormState = {
	name: '',
	pinned: false
}

const Tasks: React.FC<any> = ({ readOnly }) => {
	const [isAdding, setAddingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [staticTasks, setStaticTasks] = useState<Array<StaticTask>>([])
	const [taskList, setTaskList] = useState<Array<Task>>([])

	const [addingForm, setAddingForm] = useState(InitAddingForm)

	const toggleAdding = () => setAddingState(s => !s)
	const toggleRemoving = () => setRemovingState(s => !s)

	function resetAddingState() {
		setAddingForm(InitAddingForm)
		setAddingState(false)
	}

	function toggleClear() {
		const confirmation = window.prompt(
			'Did you complete everything?\n\n' +
			'Type \'confirm\' to clear Tasks.'
		);
		if (confirmation?.toLocaleLowerCase() === 'confirm') {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.ClearTaskList().then(tl => setTaskList(tl))
		}
	}

	async function RemoveTask(task: Task) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${task.name}' ?`);
		if (confirmation) {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.RemoveTask(task).then(tl => setTaskList(tl))
		}
	}

	async function PostTask(e: any) {
		e.preventDefault()
		if (!addingForm.name) return

		let task = {
			name: addingForm.name,
			pinned: addingForm.pinned
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(task);
		Api.PostTask(task).then(tl => {
			resetAddingState()
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
			<div className="section-scroll">
				{(() => {

					if (isAdding) return (
						<Form title="Add Task">
							<TaskForm
								submit={PostTask}
								form={addingForm}
								setForm={setAddingForm} />
						</Form>
					)

					if (!taskList.length) return (
						<div className="content-empty"><p>Nothing here.</p></div>
					)

					return (
						<>
							<div className="tasks content">
								{taskList.length &&
									taskList.map((task, i) => (
										<div
											key={i}
											className="content-line with-border task"
											onClick={() => RemoveTask(task)}>
											<p
												className={task.pinned ? 'pin' : ''}>{task.name}</p>
										</div>
									))
								}
							</div>
							< div className="static-tasks content">
								<h3>Weekly</h3>
								{staticTasks.map((task, i: number) => (
									<div key={i} className="content-line with-border">
										<p className="weekday">{task.weekday}</p>
										<p className="name">{task.name}</p>
									</div>
								))}
							</div>
						</>
					)
				})()}
			</div>

			<ActionBar>
				<ActionBarButton
					is={isAdding}
					click={toggleAdding}
					cancel={resetAddingState}
					render={<VscDiffAdded />} />
				<ActionBarButton
					is={isRemoving}
					click={toggleRemoving}
					cancel={toggleRemoving}
					render={<VscDiffRemoved />} />
				<ActionBarButton
					click={toggleClear}
					render={<VscDebugStop />} />
			</ActionBar>
		</>
	)
}

export default Tasks