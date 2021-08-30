import { useState, useEffect } from 'react'
import Api from '../../api'

import '../../styles/sections/tasks.scss'

const Tasks: React.FC = () => {

	const [staticTasks, setStaticTasks] = useState<Array<StaticTask>>([])
	const [taskList, setTaskList] = useState<Array<Task>>([])

	useEffect(() => {
		(async () => Api.GetTaskList().then(tl => setTaskList(tl)))();
		(async () => Api.GetStaticTasks().then(st => setStaticTasks(st)))();
	}, [])

	useEffect(() => {
		staticTasks.length && console.log({ StaticTasks: staticTasks })
	}, [staticTasks])

	useEffect(() => {
		taskList.length && console.log({ TaskList: taskList })
	}, [taskList])

	return (
		<div className="tasklist">
			<h1>Tasks</h1>
			<div className="tasks">
				{taskList.map((task: any, i) => (
					<p key={i} className="task imp-task">
						{task.name}
					</p>
				))}
				<br />
				<br />
				<h3>Weekly</h3>
				{staticTasks.map((task, i) => (
					<div key={i} className="task static-task">
						<p>{task.weekday}</p>
						<p>{task.name}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Tasks