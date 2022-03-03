import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'

import ViewTitle from './Title'
import ViewActions from './Actions'

import 'Styles/components/view/view.scss'

interface Props {
	props: {
		socket: Socket
		state: SwtState
		auth: boolean
		setAuth: React.Dispatch<boolean>
		setModeValue: (mode: any) => any
		setThemeValues: (theme: any) => any
	}
	path: string
	title: string
	component: React.FC<any>
	subRoutes: Array<SubRoute>
}

const View: React.FC<Props> = (viewProps) => {
	const { props, path, title, component, subRoutes } = viewProps
	const Parent = component

	const [actionsOpen, setActionsOpen] = useState(false)

	useEffect(() => {
		setActionsOpen(false)
	}, [path])

	const layoutProps = {
		title,
		subRoutes,
		actionsOpen,
		setActionsOpen
	}

	return (
		<Routes>
			<Route path="/" element={<Layout props={layoutProps} />}>
				<Route index element={<Parent {...props} />} />
				{subRoutes.map(({ path, component }) => {
					const Form = component
					return (
						<Route
							key={path}
							path={path}
							element={<Form {...props} />} />
					)
				})}
			</Route>
		</Routes>
	)
}

export default View

const Layout: React.FC<any> = ({ props }) => (
	<div id="View">
		<ViewTitle title={props.title} />
		<Outlet />
		<ViewActions
			actions={props.subRoutes}
			open={props.actionsOpen}
			setOpen={props.setActionsOpen} />
	</div>
)

// const slideDownProps: MotionProps = {
// 	initial: 'hidden',
// 	transition: {
// 		duration: .5,
// 	},
// 	style: { width: '100%' },
// 	variants: {
// 		hidden: {
// 			opacity: 0,
// 			y: title !== 'Overview'
// 				? -40
// 				: 0
// 		},
// 		visible: { opacity: 1, y: 0 }
// 	}
// }

// <div id="View">
// 	<ViewTitle {...titleProps} />


// 	<motion.div {...slideDownProps} animate={activeForm.type ? 'visible' : 'hidden'}>
// 		{activeForm.type && <Form {...formProps} />}
// 	</motion.div>
// 	<motion.div {...slideDownProps} animate={!activeForm.type ? 'visible' : 'hidden'}>
// 		{!activeForm.type && <Parent {...componentProps} />}
// 	</motion.div>

// 	<ViewActions {...actionsProps} />
// </div>