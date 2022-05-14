import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MotionProps, motion } from 'framer-motion'

import { MdMoreHoriz, MdMoreVert, MdPostAdd, MdOutlineUpdate } from 'react-icons/md'
import { RiDeleteBin4Line, RiDeleteBin3Line } from 'react-icons/ri'

import 'Styles/components/page/actions.scss'
import { AppContext } from 'app'

interface Props {
	open: boolean
	setOpen: React.Dispatch<boolean>
	actions: Array<string>
}

const PageActions: React.FC<Props> = (props) => {
	const { open, setOpen, actions } = props

	const navigate = useNavigate()

	function actionClick(path: string) {
		navigate(path)
		setOpen(false)
	}

	const slideUpProps: MotionProps = {
		initial: 'hidden',
		exit: 'hidden',
		transition: {
			type: 'spring',
			stiffness: 80,
			mass: .4
		},
		animate: open ? 'visible' : 'hidden',
		style: { position: 'absolute' },
		variants: {
			hidden: { opacity: 0, bottom: -200 },
			visible: { opacity: 1, bottom: 50 }
		}
	}

	if (!actions.length) return <></>

	return (
		<div className="page-actions">
			<div className="actions-wrap">
				<motion.div {...slideUpProps}>
					{actions.map((action, i) => (
						<Action
							key={i}
							path={action}
							onClick={() => actionClick(action)} />
					))}
				</motion.div>
				<ActionsButton open={open} toggle={() => setOpen(!open)} />
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

const Action: React.FC<any> = ({ path, onClick }) => {
	const { state } = useContext(AppContext)

	switch (path) {
		case 'post':
			return <div className="action" onClick={onClick}><MdPostAdd /></div>
		case 'update':
			return <div className="action" onClick={onClick}><MdOutlineUpdate /></div>
		case 'delete':
			return <div className="action" onClick={onClick}><RiDeleteBin4Line /></div>
		case 'deleteChecked':
			return state!.groceryList.filter(g => g.checked).length
				? <div className="action" onClick={onClick}><RiDeleteBin3Line /></div>
				: <></>
		default:
			return <></>
	}
}