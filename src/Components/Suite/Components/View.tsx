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

	const [form, setForm] = useState<any>(INITIAL_FORM)

	const Parent = component
	const Form = form.component


	function dispatchForm(action: ViewAction) {
		console.log(action)
		setForm(action)
	}

	function goBackClick() {
		if (form.type) {
			return setForm(INITIAL_FORM)
		}
		dispatchView('overview')
	}

	const titleProps = {
		title,
		goBack: goBackClick
	}

	const componentProps = {
		...props,
		form,
		dispatchForm
	}

	const actionsProps = {
		component,
		actions,
		form,
		dispatchForm
	}

	return (
		<div id="View">
			<ViewTitle {...titleProps} />
			{form.type
				? <Form />
				: <Parent {...componentProps} />
			}
			{!form.type && <ViewActions {...actionsProps} />}
		</div>
	)
}

export default View