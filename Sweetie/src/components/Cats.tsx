import { useEffect, useState } from 'react'
import { isSameDay, startOfToday } from 'date-fns'
import Api from '../api'

import '../styles/cats.scss'

const Cats: React.FC = () => {
	const [foodProgress, setFoodProgress] = useState(100)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(100)
	const [wastePercent, setWastePercent] = useState(0)

	useEffect(() => {
		(async () => Api.GetCatSchedule().then(cs => {
			console.log({ CatSchedule: cs })
			const today = cs.find(d => isSameDay(new Date(d.date), startOfToday()))
			setFoodProgress(today!.food.progress)
			setWasteProgress(today!.waste.progress)
		}))()
	}, [])

	useEffect(() => {
		calculateCircleProgress(circleProps.r, foodProgress, setFoodPercent)
		calculateCircleProgress(circleProps.r, wasteProgress, setWastePercent)
	}, [foodProgress, wasteProgress])

	function calculateCircleProgress(r: number, progress: number, setter: any) {
		var c = Math.PI * (r * 2);
		var pct = ((100 - progress) / 100) * c;
		setter(pct)
	}

	const circleProps = {
		r: 70,
		cx: 80,
		cy: 80,
		fill: 'transparent',
		strokeDasharray: '440',
		strokeDashoffset: '0'
	}

	function animate(prop: number) {
		return prop === 100
			? 'ease-in-out 5s infinite alternate glow'
			: 'unset'
	}

	return (
		<div className="cat-schedule">
			<h1>Cats</h1>
			<div className="schedule">
				<div className="labels">
					<p>Food</p>
					<p>Litter</p>
				</div>
				<div className="indicators">
					<div id="cont" style={{ animation: animate(foodProgress) }}>
						<svg id="svg" width="160" height="160">
							<circle {...circleProps} />
							<circle
								id="bar"
								{...circleProps}
								style={{ strokeDashoffset: foodPercent }} />
						</svg>
					</div>
					<div id="cont" style={{ animation: animate(wasteProgress) }}>
						<svg id="svg" width="160" height="160">
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