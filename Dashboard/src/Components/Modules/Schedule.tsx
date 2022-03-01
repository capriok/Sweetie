import { useEffect, useState } from 'react'

import ProgressCircle from 'Components/Common/ProgressCircle'

import 'Styles/modules/schedule.scss'

interface Props {
	state: SwtState
}

const ScheduleModule: React.FC<Props> = (props) => {
	const { state } = props

	const [foodProgress, setFoodProgress] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [floorProgress, setFloorProgress] = useState(0)

	useEffect(() => {
		if (state.catSchedule) {
			setFoodProgress(state.catSchedule.food.progress)
			setWasteProgress(state.catSchedule.waste.progress)
			setFloorProgress(20)
		}
	}, [state.catSchedule])

	return (
		<div className="schedule-module">
			<div className="module-cont">
				<div className="schedule">
					<p className="schedule-title _module-title">Food</p>
					<ProgressCircle progress={foodProgress} />
				</div>
				<div className="schedule">
					<p className="schedule-title _module-title">Waste</p>
					<ProgressCircle progress={wasteProgress} />
				</div>
				<div className="schedule">
					<p className="schedule-title _module-title">Floor</p>
					<ProgressCircle progress={floorProgress} />
				</div>
			</div>
		</div>
	)
}

export default ScheduleModule
