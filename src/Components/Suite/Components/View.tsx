import React, { useState } from 'react'

import ViewTitle from './ViewTitle'

import 'Styles/Suite/components/view.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
	title: string
	props: any
	component: React.FC<any>
}

const View: React.FC<Props> = (viewProps) => {
	const { title, component, props } = viewProps
	const Component = component

	const [form, setForm] = useState<{ [key: string]: boolean }>({ post: false })

	function dispatchForm(value: string) {
		setForm({ [value]: true })
	}

	const titleProps = {
		title,
		goBack: () => props.dispatchView('overview')
	}

	const componentProps = {
		...props,
		form,
		dispatchForm
	}

	return (
		<div id="View">
			<ViewTitle {...titleProps} />
			<Component {...componentProps} />
		</div>
	)
}

export default View