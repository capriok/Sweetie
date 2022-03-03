import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { MotionProps, motion } from 'framer-motion'

import { MdMoreHoriz, MdMoreVert, MdPostAdd, MdOutlineUpdate, MdDeleteOutline } from 'react-icons/md'

import 'Styles/components/page/router.scss'

interface Props {
	open: boolean
	setOpen: React.Dispatch<boolean>
	routes: Array<SubRoute>
}

const PageRouter: React.FC<Props> = (props) => {
	const { open, setOpen, routes: router } = props

	const navigate = useNavigate()

	const routerButtonProps = {
		open,
		toggle: () => setOpen(!open)
	}

	function routeClick(path: string) {
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

	if (!router.length) return <></>

	return (
		<div className="page-router">
			<div className="router-wrap">
				<motion.div {...slideUpProps}>
					{open && router.map((action, i) => (
						<Route
							key={i}
							path={action.path}
							onClick={() => routeClick(action.path)} />
					))}
				</motion.div>
				<RouterButton {...routerButtonProps} />
			</div>
		</div>
	)
}

export default PageRouter

const RouterButton: React.FC<any> = ({ open, toggle }) => (
	<div
		className="router-button"
		onClick={toggle}>
		{!open ? <MdMoreHoriz /> : <MdMoreVert />}
	</div>
)

const Route: React.FC<any> = ({ path, onClick }) => {
	switch (path) {
		case 'post':
			return <div className="route" onClick={onClick}><MdPostAdd /></div>
		case 'update':
			return <div className="route" onClick={onClick}><MdOutlineUpdate /></div>
		case 'delete':
			return <div className="route" onClick={onClick}><MdDeleteOutline /></div>
		default:
			return <></>
	}
}