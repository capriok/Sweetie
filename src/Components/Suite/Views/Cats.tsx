import React, { useEffect, useState } from 'react'
import Api from 'api'

import ViewItem from '../Components/ViewItem'
import ProgressCircle from 'Components/Shared/ProgressCircle'

import 'Styles/Suite/views/cats.scss'

const Cats: React.FC<any> = (props) => {
	const { state, dispatch } = props

	const [catConfig, setCatConfig] = useState<any>({})

	const [foodProgress, setFoodProgress] = useState(0)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [wastePercent, setWastePercent] = useState(0)

	useEffect(() => {
		Api.GetCatConfig().then((cc) => {
			setCatConfig({
				lastFoodDay: cc.lastFoodDay,
				lastWasteDay: cc.lastWasteDay
			})
		})
	}, [])

	useEffect(() => {
		if (!catConfig.lastFoodDay || !catConfig.lastWasteDay) return
		// setUpdatingForm({
		// 	lfd: catConfig.lastFoodDay,
		// 	lwd: catConfig.lastWasteDay
		// })
	}, [catConfig])

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
			<ViewItem className="progress-wrap">
				<p>Food</p>
				<ProgressCircle
					{...circleProps}
					progress={foodProgress}
					percent={foodPercent} />
			</ViewItem>
			<ViewItem className="progress-wrap">
				<p>Waste</p>
				<ProgressCircle
					{...circleProps}
					progress={wasteProgress}
					percent={wastePercent} />
			</ViewItem>
		</div>
	)
}

export default Cats
