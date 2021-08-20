import React, { useEffect, useState } from 'react'

import '../styles/actionbar.scss'

import { VscDebugStop } from 'react-icons/vsc'

const ActionBar: React.FC<any> = ({ actives, children }) => {
	const [active, setActive] = useState<any>({ cb: () => { } })

	useEffect(() => {
		actives.some((a: any) => {
			if (a.is) return setActive({ cb: a.cb })
			else return false
		})
	}, [actives])

	return (
		<div className="action-bar">
			<div className="actionbar-wrap">
				{actives.some((a: any) => a.is)
					? <ActionBarButton click={active.cb} render={<VscDebugStop />} />
					: children
				}
			</div>
		</div>
	)
}

export default ActionBar

export const ActionBarButton: React.FC<any> = ({ click, render }) => {
	return <div className="action-button" onClick={click}>{render}</div>
}