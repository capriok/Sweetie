import React, { useEffect, useState } from 'react'

import PageItem from 'Components/Page/Item'
import ProgressCircle from 'Components/Common/ProgressCircle'

import 'Styles/pages/schedule.scss'

interface Props {
	state: SwtState
}

const SchedulePage: React.FC<Props> = (props) => {
	const { state } = props

	const [foodProgress, setFoodProgress] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [floorProgress, setFloorProgress] = useState(0)

	useEffect(() => {
		if (!state.schedules.date) return
		setFoodProgress(state.schedules.food.progress)
		setWasteProgress(state.schedules.waste.progress)
		setFloorProgress(state.schedules.floor.progress)
	}, [state.schedules])

	return (
		<div className="schedule">
			<div className="schedule-title"><p>Cats</p></div>
			<div className="schedules">
				<PageItem className="schedule-wrap">
					<div className="schedule-title">Food</div>
					<ProgressCircle progress={foodProgress} />
				</PageItem>
				<PageItem className="schedule-wrap">
					<div className="schedule-title">Waste</div>
					<ProgressCircle progress={wasteProgress} />
				</PageItem>
				<div className="schedule-title">House</div>
				<PageItem className="schedule-wrap">
					<div className="schedule-title">Floor</div>
					<ProgressCircle progress={floorProgress} />
				</PageItem>
			</div>
		</div>
	)
}

export default SchedulePage
