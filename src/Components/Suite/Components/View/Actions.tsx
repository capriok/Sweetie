import React, { useEffect, useState } from 'react'
import { MotionProps, motion } from 'framer-motion'

import { MdMoreHoriz, MdMoreVert, MdPostAdd, MdOutlineUpdate, MdDeleteOutline } from 'react-icons/md'

import 'Styles/Suite/components/view/actions.scss'

interface Props {
	component: React.FC<any>
	actions: Array<ViewAction>
	activeForm: ViewAction
	dispatchForm: (action: ViewAction) => void
}

const ViewActions: React.FC<Props> = (props) => {
	const { component, actions, activeForm, dispatchForm } = props

	const [open, setOpen] = useState(false)

	useEffect(() => {
		setOpen(false)
	}, [component, activeForm])

	const actionButtonProps = {
		open,
		setOpen
	}

	const slideUpProps: MotionProps = {
		initial: 'hidden',
		transition: {
			type: 'spring',
			duration: 0.1,
			stiffness: 80,
			mass: .4
		},
		animate: open ? 'visible' : 'hidden',
		style: { position: 'absolute' },
		variants: {
			hidden: { bottom: -250 },
			visible: { bottom: 50 }
		}
	}

	if (!actions.length || activeForm.type) return <></>

	return (
		<div className="view-actions">
			<div className="actions-wrap">
				<motion.div {...slideUpProps}>
					{open && actions.map((action, i) => (
						<ActionType
							key={i}
							action={action}
							onClick={() => dispatchForm(action)} />
					))}
				</motion.div>
				<ActionsButton {...actionButtonProps} />
			</div>
		</div>
	)
}

export default ViewActions

const ActionsButton: React.FC<any> = ({ open, setOpen }) => (
	<div
		className="actions-button"
		onClick={() => setOpen(!open)}>
		{!open ? <MdMoreHoriz /> : <MdMoreVert />}
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