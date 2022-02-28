import React, { useEffect, useState } from 'react'

import ViewItem from 'Components/View/Item'
import ProgressCircle from 'Components/Common/ProgressCircle'

import 'Styles/views/cats.scss'

const Cats: React.FC<any> = (props) => {
	const { state } = props

	const [foodProgress, setFoodProgress] = useState(0)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [wastePercent, setWastePercent] = useState(0)

	useEffect(() => {
		if (!state.catSchedule.date) return
		setFoodProgress(state.catSchedule.food.progress)
		setWasteProgress(state.catSchedule.waste.progress)
	}, [state.catSchedule])

	useEffect(() => {
		calculateCircleProgress(circleProps.r, foodProgress, setFoodPercent)
		calculateCircleProgress(circleProps.r, wasteProgress, setWastePercent)
	}, [foodProgress, wasteProgress])

	function calculateCircleProgress(r: number, progress: number, setter: any) {
		var c = Math.PI * (r * 2)
		var pct = ((100 - progress) / 100) * c
		setter(pct)
	}

	const circleProps = {
		h: 100,
		w: 100,
		r: 30,
		cx: 50,
		cy: 50,
		strokeDasharray: '189'
	}

	return (
		<div className="cats">
			<div className="cats-title"><p>Schedules</p></div>
			<div className="schedules">
				<ViewItem className="progress-wrap">
					<div className="cats-title">Food</div>
					<ProgressCircle
						{...circleProps}
						progress={foodProgress}
						percent={foodPercent} />
				</ViewItem>
				<ViewItem className="progress-wrap">
					<div className="cats-title">Waste</div>
					<ProgressCircle
						{...circleProps}
						progress={wasteProgress}
						percent={wastePercent} />
				</ViewItem>
			</div>
		</div>
	)
}

export default Cats
