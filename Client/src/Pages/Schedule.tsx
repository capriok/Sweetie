import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'app'

import PageItem from 'Components/Page/Item'
import { ProgressBar, BarOptions } from 'progresses'

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

	const progressBarOptions: BarOptions = {
		showPercent: false,
		colors: {
			back: '#c1c1c1',
			fill: 'steelblue'
		}
	}

	return (
		<div className="schedule">
			<div className="schedule-title"><p>Cats</p></div>
			<div className="schedules">
				<PageItem className="schedule-wrap">
					<div className="schedule-title">Food</div>
					<ProgressBar percent={foodProgress} options={progressBarOptions} />
				</PageItem>
				<PageItem className="schedule-wrap">
					<div className="schedule-title">Waste</div>
					<ProgressBar percent={wasteProgress} options={progressBarOptions} />
				</PageItem>
				<div className="schedule-title">House</div>
				<PageItem className="schedule-wrap">
					<div className="schedule-title">Floor</div>
					<ProgressBar percent={floorProgress} options={progressBarOptions} />
				</PageItem>
			</div>
		</div>
	)
}

export default SchedulePage
