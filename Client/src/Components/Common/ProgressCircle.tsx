import React from 'react'

import 'Styles/components/common/progress-circle.scss'

interface Props {
	h: number
	w: number
	r: number
	cx: number
	cy: number
	strokeDasharray: string
	progress: number
	percent: number
}

const ProgressCircle: React.FC<Props> = (props) => {
	const { w, h, progress, percent } = props
	const circleProps = {
		...props,
		strokeDashoffset: '0',
		fill: 'transparent'
	}

	return (
		<div id="Progress">
			<svg id="svg" width={w} height={h}>
				<circle
					id="stroke"
					{...circleProps}
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