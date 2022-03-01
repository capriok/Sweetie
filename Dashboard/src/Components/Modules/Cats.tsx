import { useEffect, useState } from 'react'

import ProgressCircle from 'Components/Common/ProgressCircle'

import 'Styles/modules/cats.scss'

interface Props {
	state: SwtState
}

const CatsModule: React.FC<Props> = (props) => {
	const { state } = props
	const [foodProgress, setFoodProgress] = useState(0)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [wastePercent, setWastePercent] = useState(0)

	useEffect(() => {
		if (state.catSchedule) {
			setFoodProgress(state.catSchedule.food.progress)
			setWasteProgress(state.catSchedule.waste.progress)
		}
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

	return (
		<div className="cats-module">
			<div className="schedules">
				<div className="schedule">
					<p className="sub-title">Food</p>
					<ProgressCircle
						{...circleProps}
						progress={foodProgress}
						percent={foodPercent} />
				</div>
				<div className="schedule">
					<p className="sub-title">Waste</p>
					<ProgressCircle
						{...circleProps}
						progress={wasteProgress}
						percent={wastePercent} />
				</div>
			</div>
		</div>
	)
}

export default CatsModule

const circleProps = {
	h: 180,
	w: 180,
	r: 77.5,
	cx: 90,
	cy: 90,
	strokeDasharray: '488'
}
