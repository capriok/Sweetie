import React, { useEffect, useState } from 'react'

import { MdPostAdd, MdOutlineUpdate, MdDeleteOutline } from 'react-icons/md'

import 'Styles/Suite/components/view/actions.scss'

interface Props {
	component: React.FC<any>
	actions: Array<ViewAction>
	form: ViewAction
	dispatchForm: (action: ViewAction) => void
}

const ViewActions: React.FC<Props> = (props) => {
	const { component, actions, form, dispatchForm } = props

	const [visible, setVisibility] = useState(false)

	useEffect(() => {
		setVisibility(false)
	}, [component, form])

	const actionButtonProps = {
		visible,
		setVisibility
	}

	if (!actions.length) return <></>

	return (
		<div className="view-actions">
			<div className="actions-wrap">
				{visible && actions.map((action, i) => (
					<ActionType key={i} action={action} onClick={() => dispatchForm(action)} />
				))}
				<ActionsButton {...actionButtonProps} />
			</div>
		</div>
	)
}

export default ViewActions

const ActionsButton: React.FC<any> = ({ visible, setVisibility }) => (
	<div
		className="actions-button"
		onClick={() => setVisibility(!visible)}>
		+
	</div>
)

const ActionType: React.FC<any> = ({ action, onClick }) => {
	switch (action.type) {
		case 'post':
			return <div className="action" onClick={onClick}><MdPostAdd /></div>
		case 'update':
			return <div className="action" onClick={onClick}><MdOutlineUpdate /></div>
		case 'delete':
			return <div className="action" onClick={onClick}><MdDeleteOutline /></div>

		default:
			return <></>
	}
}