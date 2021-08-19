import React, { useEffect, useState } from 'react'

import '../styles/actionbar.scss'

import { VscDebugStop } from 'react-icons/vsc'

const Actionbar: React.FC<any> = ({ actives, children }) => {
	const [cb, setCb] = useState<any>([])

	useEffect(() => {
		actives.some((a: any) => {
			if (a[0]) return setCb(a)
			else return false
		})
	}, [actives])

	return (
		<div className="action-bar">
			{actives.some((a: any) => a[0])
				? <ActionBarButton click={cb[1]} render={<VscDebugStop />} />
				: children
			}
		</div>
	)
}

export default Actionbar

export const ActionBarButton: React.FC<any> = ({ click, render }) => {
	return <div className="action-button" onClick={click}>{render}</div>
}