import { useEffect, useState } from 'react'
import Api from '../../../api'

import '../../../Styles/Sweetie/Tiles/cats.scss'

const Cats: React.FC = () => {
	const [foodProgress, setFoodProgress] = useState(0)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(0)
	const [wastePercent, setWastePercent] = useState(0)

	useEffect(() => {
		(async () => Api.GetCatSchedule().then(({ today, cs }) => {
			console.log({ CatSchedule: cs })
			if (today) {
				setFoodProgress(today.food.progress)
				setWasteProgress(today.waste.progress)
			}
		}))()
	}, [])

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
		r: 85,
		cx: 100,
		cy: 100,
		fill: 'transparent',
		strokeDasharray: '532',
		strokeDashoffset: '0'
	}

	return (
		<div className="cat-schedule">
			<div className="schedule">
				<div className="labels sub-title">
					<p>Food</p>
					<p>Litter</p>
				</div>
				<div className="indicators">
					<div id="cont" style={{ animation: animate(foodProgress) }}>
						<svg id="svg" width="200" height="200">
							<circle {...circleProps} />
							<circle
								id="bar"
								{...circleProps}
								style={{ strokeDashoffset: foodPercent }} />
						</svg>
					</div>
					<div id="cont" style={{ animation: animate(wasteProgress) }}>
						<svg id="svg" width="200" height="200">
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

export default Cats