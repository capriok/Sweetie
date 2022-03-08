import React from 'react'
import { useNavigate } from 'react-router'
import { MotionProps, motion } from 'framer-motion'

import { MdMoreHoriz, MdMoreVert, MdPostAdd, MdOutlineUpdate, MdDeleteOutline } from 'react-icons/md'

import 'Styles/components/page/actions.scss'

interface Props {
	open: boolean
	setOpen: React.Dispatch<boolean>
	actions: Array<string>
}

const PageActions: React.FC<Props> = (props) => {
	const { open, setOpen, actions } = props

	const navigate = useNavigate()

	const actionsButtonProps = {
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
		<div className="page-actions">
			<div className="actions-wrap">
				<motion.div {...slideUpProps}>
					{open && actions.map((action, i) => (
						<Route
							key={i}
							path={action}
							onClick={() => actionClick(action)} />
					))}
				</motion.div>
				<ActionsButton {...actionsButtonProps} />
			</div>
		</div>
	)
}

export default PageActions

const ActionsButton: React.FC<any> = ({ open, toggle }) => (
	<div
		className="actions-button"
		onClick={toggle}>
		{!open ? <MdMoreHoriz /> : <MdMoreVert />}
	</div>
)

const Route: React.FC<any> = ({ path, onClick }) => {
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