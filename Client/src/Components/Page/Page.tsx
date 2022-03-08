import React, { useState } from 'react'

import PageTitle from './Title'
import PageActions from './Actions'

import 'Styles/components/page/page.scss'

interface Props {
	title: string
	component: React.FC<any>
	actions: Array<string>
}

const Page: React.FC<Props> = (props) => {
	const { title, component, actions } = props
	const PageComponent = component

	const [actionsOpen, setActionsOpen] = useState(false)

	return (
		<div id="Page">
			<PageTitle title={title} />
			<PageComponent />
			<PageActions
				actions={actions}
				open={actionsOpen}
				setOpen={setActionsOpen} />
		</div>
	)
}

export default Page
