import { useEffect, useState } from 'react'

import '../../../Styles/Sweetie/Tiles/cat-tile.scss'

const CatTile: React.FC<{ state: SwtState }> = ({ state }) => {
	const [foodProgress, setFoodProgress] = useState(0)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [wastePercent, setWastePercent] = useState(0)

	useEffect(() => {
		if (state.catSchedule.today) {
			setFoodProgress(state.catSchedule.today.food.progress)
			setWasteProgress(state.catSchedule.today.waste.progress)
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

	function animate(prop: number) {
		return prop === 100
			? 'ease-in-out 5s infinite alternate glow'
			: 'unset'
	}

	const circleProps = {
		r: 80,
		cx: 90,
		cy: 90,
		fill: 'transparent',
		strokeDasharray: '500',
		strokeDashoffset: '0'
	}

	return (
		<div className="cat-tile">
			<div className="schedule">
				<div className="labels sub-title">
					<p>Food</p>
					<p>Litter</p>
				</div>
				<div className="indicators">
					<div id="cont" style={{ animation: animate(foodProgress) }}>
						<svg id="svg" width="180" height="180">
							<circle {...circleProps} />
							<circle
								id="bar"
								{...circleProps}
								style={{ strokeDashoffset: foodPercent }} />
						</svg>
					</div>
					<div id="cont" style={{ animation: animate(wasteProgress) }}>
						<svg id="svg" width="180" height="180">
							<circle {...circleProps} />
							<circle
								id="bar"
								{...circleProps}
								style={{ strokeDashoffset: wastePercent }} />
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CatTile