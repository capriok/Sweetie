import React, { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

import PageTitle from './Title'
import PageRouter from './Router'

import 'Styles/components/page/page.scss'

interface Props {
	props: {
		socket: Socket
		state: SwtState
		auth: boolean
		setAuth: React.Dispatch<boolean>
		setModeValue: (mode: any) => any
		setThemeValues: (theme: any) => any
	}
	title: string
	component: React.FC<any>
	subRoutes: Array<SubRoute>
}

const Page: React.FC<Props> = (viewProps) => {
	const { props, title, component, subRoutes } = viewProps
	const PageComponent = component

	const [actionsOpen, setActionsOpen] = useState(false)

	const layoutProps = {
		title,
		subRoutes,
		actionsOpen,
		setActionsOpen
	}

	return (
		<Routes>
			<Route path="/" element={<Layout props={layoutProps} />}>
				<Route index element={
					<PageComponent {...props} />
				} />
				{subRoutes.map(({ path, component: Form }) => (
					<Route
						key={path}
						path={path}
						element={
							<Form {...props} />
						} />
				))}
			</Route>
		</Routes>
	)
}

export default Page

const Layout: React.FC<any> = ({ props }) => (
	<div id="Page">
		<PageTitle title={props.title} />
		<Outlet />
		<PageRouter
			routes={props.subRoutes}
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