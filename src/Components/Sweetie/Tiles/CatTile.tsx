import { useEffect, useState } from 'react'

import '../../../Styles/Sweetie/Tiles/cat-tile.scss'

const CatTile: React.FC<{ state: SwtState }> = ({ state }) => {
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
		<div className="cat-tile">
			<div className="schedule">
				<div className="labels sub-title">
					<p>Food</p>
					<p>Litter</p>
				</div>
				<div className="indicators">
					<ProgressCircle progress={foodProgress} percent={foodPercent} />
					<ProgressCircle progress={wasteProgress} percent={wastePercent} />
				</div>
			</div>
		</div>
	)
}

export default CatTile

function animate(prop: number) {
	return prop === 100
		? 'ease-in-out 5s infinite alternate glow'
		: 'unset'
}

const circleProps = {
	r: 77.5,
	cx: 90,
	cy: 90,
	fill: 'transparent',
	strokeDasharray: '485',
	strokeDashoffset: '0'
}

const ProgressCircle: React.FC<any> = ({ progress, percent }) => {

	return (
		<div id="cont" style={{ animation: animate(progress) }}>
			<svg id="svg" width="180" height="180">
				<circle {...circleProps} />
				<circle
					id="bar"
					{...circleProps}
					style={{ strokeDashoffset: percent }} />
			</svg>
		</div>
	)
}
