import { useState, useEffect } from 'react'
import '../styles/tasklist.scss'


const TaskList: React.FC = () => {

	const [tasks, setTasks] = useState([
		{ name: 'Wipe Counters' },
		{ name: 'Litter Box' },
		{ name: 'Pull Weeds' }
	])

	useEffect(() => {
	}, [])

	return (
		<div className="tasklist">
			<h1>Tasks</h1>
			<h3>Home</h3>
			<div className="tasks">
				{tasks.map((task: any, i) => (
					<p key={i} className="task">
						{task.name}
					</p>
				))}
			</div>
		</div>
	)
}

export default TaskList