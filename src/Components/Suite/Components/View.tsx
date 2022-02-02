import React, { useState } from 'react'

import ViewTitle from './View/Title'
import ViewActions from './View/Actions'

import 'Styles/Suite/components/view/view.scss'

interface Props {
	props: {
		socket: Socket
		state: SwtState
		dispatch: React.Dispatch<SwtAction>
		dispatchView: (value: string) => void
	}
	title: string
	component: React.FC<any>
	actions: Array<{
		type: string
		component: React.FC<any> | string
	}>
}

const View: React.FC<Props> = (viewProps) => {
	const { props, title, component, actions } = viewProps
	const { dispatchView } = props
	const Component = component

	const [form, setForm] = useState<ViewFormState>({ post: false })

	function dispatchForm(value: string) {
		setForm({ [value]: true })
	}

	const titleProps = {
		title,
		goBack: () => dispatchView('overview')
	}

	const componentProps = {
		...props,
		form,
		dispatchForm
	}

	const actionsProps = {
		actions, form, dispatchForm
	}

	return (
		<div id="View">
			<ViewTitle {...titleProps} />
			<Component {...componentProps} />
			<ViewActions {...actionsProps} />
		</div>
	)
}

export default View