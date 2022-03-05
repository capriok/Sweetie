import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import PageTitle from './Title'
import PageActions from './Actions'

import 'Styles/components/page/page.scss'

interface Props {
	title: string
	component: React.FC<any>
	subRoutes: Array<SubRoute>
}

const Page: React.FC<Props> = (props) => {
	const PageComponent = props.component

	const [actionsOpen, setActionsOpen] = useState(false)

	return (
		<div id="Page">
			<PageTitle title={props.title} />
			<Routes>
				<Route path="/" element={<PageComponent />} />
				{props.subRoutes.map(({ path, component: FormPage }) => (
					<Route
						key={path}
						path={path}
						element={<FormPage />} />
				))}
			</Routes>
			<PageActions
				actions={props.subRoutes}
				open={actionsOpen}
				setOpen={setActionsOpen} />
		</div>
	)
}

export default Page
