import { useEffect, useState } from 'react'
import { GiOpenedFoodCan, GiNuclearWaste } from 'react-icons/gi'
import Api from '../api'

import '../styles/cats.scss'

const Cats: React.FC = () => {
	const [schedule, setSchedule] = useState<any>([])

	const [foodProgress, setFoodProgress] = useState(50)
	const [foodPercent, setFoodPercent] = useState(0)
	const [wasteProgress, setWasteProgress] = useState(66)
	const [wastePercent, setWastePercent] = useState(0)

	useEffect(() => {
		(async () => Api.GetCatSchedule().then(cs => {
			console.log({ CatSchedule: cs })

			setSchedule(cs)
		}))()

		calculateCircleProgress(circleProps.r, foodProgress, setFoodPercent)
		calculateCircleProgress(circleProps.r, wasteProgress, setWastePercent)
	}, [])

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

	return (
		<div className="cat-schedule">
			<h1>Cats</h1>
			<div className="schedule">
				<div className="labels">
					<p>Food</p>
					<p>Litter</p>
				</div>
				<div className="indicators">
					<div id="cont" data-pct={foodProgress}>
						<svg id="svg" width="160" height="160">
							<circle {...circleProps} />
							<circle id="bar" style={{ strokeDashoffset: foodPercent }} {...circleProps} />
						</svg>
					</div>
					<div id="cont" data-pct={wasteProgress}>
						<svg id="svg" width="160" height="160">
							<circle {...circleProps} />
							<circle id="bar" style={{ strokeDashoffset: wastePercent }} {...circleProps} />
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cats