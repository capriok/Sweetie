import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import PageTitle from './Title'
import PageActions from './Actions'

import 'Styles/components/page/page.scss'

interface Props {
	pageProps: {
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
	const { pageProps, title, component, subRoutes } = viewProps
	const PageComponent = component

	const [actionsOpen, setActionsOpen] = useState(false)

	return (
		<div id="Page">
			<PageTitle title={title} />
			<Routes>
				<Route path="/" element={<PageComponent {...pageProps} />} />
				{subRoutes.map(({ path, component: FormPage }) => (
					<Route
						key={path}
						path={path}
						element={<FormPage {...pageProps} />} />
				))}
			</Routes>
			<PageActions
				actions={subRoutes}
				open={actionsOpen}
				setOpen={setActionsOpen} />
		</div>
	)
}

export default Page
