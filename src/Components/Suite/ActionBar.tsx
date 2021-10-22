import React, { useEffect, useState } from 'react'

import '../../Styles/Suite/actionbar.scss'

import { VscDebugStop } from 'react-icons/vsc'

const ActionBar: React.FC<any> = ({ children }) => {
	if (children.length === undefined) children = [children]

	const [active, setActive] = useState<any>({ cb: () => { } })

	useEffect(() => {
		children.some((c: any) => {
			if (c.props.is) {
				if (active.cb !== c.props.cancel)
					setActive({ cb: c.props.cancel })
			}
		})
	}, [children])

	return (
		<div className="action-bar">
			<div className="actionbar-wrap">
				{children.some((c: any) => c.props.is)
					? <ActionBarButton
						click={active.cb}
						render={<VscDebugStop />} />
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