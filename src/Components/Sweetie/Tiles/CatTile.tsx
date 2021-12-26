import { useEffect, useState } from 'react'

import '../../../Styles/Sweetie/Tiles/Cat-tile.scss'
import ProgressCircle from '../../Shared/ProgressCircle'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const CatTile: React.FC<Props> = (props) => {
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
		<div className="cat-tile">
			<div className="schedule">
				<div className="labels sub-title">
					<p>Food</p>
					<p>Litter</p>
				</div>
				<div className="indicators">
					<ProgressCircle
						{...circleProps}
						progress={foodProgress}
						percent={foodPercent} />
					<ProgressCircle
						{...circleProps}
						progress={wasteProgress}
						percent={wastePercent} />
				</div>
			</div>
		</div>
	)
}

export default CatTile

const circleProps = {
	h: 180,
	w: 180,
	r: 77.5,
	cx: 90,
	cy: 90,
	strokeDasharray: '485'
}
