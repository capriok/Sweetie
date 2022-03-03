import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { MotionProps, motion } from 'framer-motion'

import { MdMoreHoriz, MdMoreVert, MdPostAdd, MdOutlineUpdate, MdDeleteOutline } from 'react-icons/md'

import 'Styles/components/view/actions.scss'

interface Props {
	open: boolean
	setOpen: React.Dispatch<boolean>
	actions: Array<SubRoute>
}

const ViewActions: React.FC<Props> = (props) => {
	const { open, setOpen, actions } = props

	const navigate = useNavigate()

	const actionButtonProps = {
		open,
		toggle: () => setOpen(!open)
	}

	function actionClick(path: string) {
		navigate(path)
		setOpen(false)
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

	if (!actions.length) return <></>

	return (
		<div className="view-actions">
			<div className="actions-wrap">
				<motion.div {...slideUpProps}>
					{open && actions.map((action, i) => (
						<Action
							key={i}
							path={action.path}
							onClick={() => actionClick(action.path)} />
					))}
				</motion.div>
				<ActionsButton {...actionButtonProps} />
			</div>
		</div>
	)
}

export default ViewActions

const ActionsButton: React.FC<any> = ({ open, toggle }) => (
	<div
		className="actions-button"
		onClick={toggle}>
		{!open ? <MdMoreHoriz /> : <MdMoreVert />}
	</div>
)

const Action: React.FC<any> = ({ path, onClick }) => {
	console.log(path);

	switch (path) {
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