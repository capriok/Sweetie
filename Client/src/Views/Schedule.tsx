import React, { useEffect, useState } from 'react'

import ViewItem from 'Components/View/Item'
import ProgressCircle from 'Components/Common/ProgressCircle'

import 'Styles/views/schedule.scss'

interface Props {
	state: SwtState
}

const Schedule: React.FC<Props> = (props) => {
	const { state } = props

	const [foodProgress, setFoodProgress] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [floorProgress, setFloorProgress] = useState(0)

	useEffect(() => {
		if (!state.catSchedule.date) return
		setFoodProgress(state.catSchedule.food.progress)
		setWasteProgress(state.catSchedule.waste.progress)
		setFloorProgress(20)
	}, [state.catSchedule])

	return (
		<div className="schedule">
			<div className="schedule-title"><p>Cats</p></div>
			<div className="schedules">
				<ViewItem className="schedule-wrap">
					<div className="schedule-title">Food</div>
					<ProgressCircle progress={foodProgress} />
				</ViewItem>
				<ViewItem className="schedule-wrap">
					<div className="schedule-title">Waste</div>
					<ProgressCircle progress={wasteProgress} />
				</ViewItem>
				<div className="schedule-title">House</div>
				<ViewItem className="schedule-wrap">
					<div className="schedule-title">Floor</div>
					<ProgressCircle progress={floorProgress} />
				</ViewItem>
			</div>
		</div>
	)
}

export default Schedule
