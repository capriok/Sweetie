import React, { useState } from 'react'
import { motion, MotionProps } from 'framer-motion'

import ViewTitle from './Title'
import ViewActions from './Actions'

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

	const slideDownProps: MotionProps = {
		initial: 'hidden',
		transition: {
			duration: .5,
		},
		style: { width: '100%', },
		variants: {
			hidden: {
				opacity: 0, y:
					title !== 'Overview'
						? -40
						: 0
			},
			visible: { opacity: 1, y: 0 }
		}
	}

	return (
		<div id="View">
			<ViewTitle {...titleProps} />

			<motion.div {...slideDownProps} animate={activeForm.type ? 'visible' : 'hidden'}>
				{activeForm.type && <Form  {...formProps} />}
			</motion.div>
			<motion.div {...slideDownProps} animate={!activeForm.type ? 'visible' : 'hidden'}>
				{!activeForm.type && <Parent {...componentProps} />}
			</motion.div>

			<ViewActions {...actionsProps} />
		</div>
	)
}

export default View