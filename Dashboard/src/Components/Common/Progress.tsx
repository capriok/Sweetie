import React from 'react'
import 'Styles/common/progress.scss'

interface Props {
	progress: number
}

const Progress: React.FC<Props> = (props) => {
	const { progress } = props

	const cp = {
		width: 250,
		height: 175
	}

	return (
		<div id="Progress">
			<svg id="svg" width={cp.width} height={cp.height}>
				<rect {...cp} style={{
					height: progress + '%',
					animation: progress === 100
						? 'ease-in-out 4s infinite alternate rect-glow'
						: 'unset'
				}} />
			</svg>
			{/* <svg id="svg" width={cp.w} height={cp.h}>
				<circle
					id="stroke"
					{...cp}
					style={{
						animation: progress === 100
							? 'ease-in-out 5s infinite alternate stroke-glow'
							: 'unset'
					}} />
			</svg> */}
		</div>
	)
}

export default Progress