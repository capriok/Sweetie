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
	actions: Array<ViewAction>
}

const INITIAL_FORM = {
	type: '', component: null
}

const View: React.FC<Props> = (viewProps) => {
	const { props, title, component, actions } = viewProps
	const { dispatchView } = props

	const [activeForm, setActiveForm] = useState<any>(INITIAL_FORM)

	const Parent = component
	const Form = activeForm.component

	function dispatchForm(action: ViewAction) {
		console.log(action)
		setActiveForm(action)
	}

	function closeForm() {
		setActiveForm(INITIAL_FORM)
	}

	function goBack() {
		if (activeForm.type) {
			return closeForm()
		}
		dispatchView('overview')
	}

	const titleProps = {
		title,
		goBack
	}

	const componentProps = {
		...props,
		activeForm,
		dispatchForm
	}

	const formProps = {
		...props,
		closeForm
	}

	const actionsProps = {
		component,
		actions,
		activeForm,
		dispatchForm
	}

	return (
		<div id="View">
			<ViewTitle {...titleProps} />
			{activeForm.type
				? <Form  {...formProps} />
				: <Parent {...componentProps} />
			}
			{!activeForm.type && <ViewActions {...actionsProps} />}
		</div>
	)
}

export default View