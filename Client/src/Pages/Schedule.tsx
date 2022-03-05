import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'app'

import PageItem from 'Components/Page/Item'
import ProgressCircle from 'Components/Common/ProgressCircle'

import 'Styles/pages/schedule.scss'

const SchedulePage: React.FC = () => {
	const { state } = useContext(AppContext)

	const [foodProgress, setFoodProgress] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [floorProgress, setFloorProgress] = useState(0)

	useEffect(() => {
		if (!state!.schedules.date) return
		setFoodProgress(state!.schedules.food.progress)
		setWasteProgress(state!.schedules.waste.progress)
		setFloorProgress(state!.schedules.floor.progress)
	}, [state!.schedules])

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
