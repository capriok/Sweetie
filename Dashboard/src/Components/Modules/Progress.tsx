import { useEffect, useState } from 'react'

import ProgressCircle from 'Components/Common/ProgressCircle'

import 'Styles/modules/progress.scss'

interface Props {
	state: SwtState
}

const ProgressModule: React.FC<Props> = (props) => {
	const { state } = props
	const [foodProgress, setFoodProgress] = useState(0)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [wastePercent, setWastePercent] = useState(0)
	// const [floorProgress, setFloorProgress] = useState(0)
	// const [floorPercent, setFloorPercent] = useState(0)

	useEffect(() => {
		if (state.catSchedule) {
			setFoodProgress(state.catSchedule.food.progress)
			setWasteProgress(state.catSchedule.waste.progress)
			// setFloorProgress(20)
		}
	}, [state.catSchedule])

	useEffect(() => {
		calculateCircleProgress(circleProps.r, foodProgress, setFoodPercent)
		calculateCircleProgress(circleProps.r, wasteProgress, setWastePercent)
		// calculateCircleProgress(circleProps.r, floorProgress, setFloorPercent)
	}, [foodProgress, wasteProgress, /*floorProgress*/])

	function calculateCircleProgress(r: number, progress: number, setter: any) {
		var c = Math.PI * (r * 2)
		var pct = ((100 - progress) / 100) * c
		setter(pct)
	}

	return (
		<div className="progress-module">
			<div className="module-cont">
				<div className="schedule">
					<p className="schedule-title _module-title">Food</p>
					<ProgressCircle
						{...circleProps}
						progress={foodProgress}
						percent={foodPercent} />
				</div>
				<div className="schedule">
					<p className="schedule-title _module-title">Waste</p>
					<ProgressCircle
						{...circleProps}
						progress={wasteProgress}
						percent={wastePercent} />
				</div>
				{/* <div className="schedule">
					<p className="schedule-title _module-title">Floor</p>
					<ProgressCircle
						{...circleProps}
						progress={floorProgress}
						percent={floorPercent} />
				</div> */}
			</div>
		</div>
	)
}

export default ProgressModule

const circleProps = {
	h: 180,
	w: 180,
	r: 77.5,
	cx: 90,
	cy: 90,
	strokeDasharray: '488'
}
