import React, { useState, useEffect, useMemo } from 'react'
import 'Styles/common/progress-circle.scss'

interface Props {
	progress: number
}

const ProgressCircle: React.FC<Props> = (props) => {
	const { progress } = props

	const [percent, setPercent] = useState(0)

	const cp = useMemo(() => {
		return {
			h: 180,
			w: 180,
			r: 77.5,
			cx: 90,
			cy: 90,
			strokeDasharray: '488',
			strokeDashoffset: '0',
			fill: 'transparent'
		}
	}, [])

	useEffect(() => {
		calculateCircleProgress(cp.r, progress)
	}, [cp, progress])

	function calculateCircleProgress(r: number, progress: number) {
		var c = Math.PI * (r * 2)
		var pct = ((100 - progress) / 100) * c
		setPercent(pct)
	}

	return (
		<div id="Progress">
			<svg id="svg" width={cp.w} height={cp.h}>
				<circle
					id="stroke"
					{...cp}
					style={{
						strokeDashoffset: percent,
						animation: progress === 100
							? 'ease-in-out 5s infinite alternate stroke-glow'
							: 'unset'
					}} />
			</svg>
		</div>
	)
}

export default ProgressCircle