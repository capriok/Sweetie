import React, { useEffect, useState } from 'react'
import useAppMode from 'Hooks/useAppMode'
import useAppTheme from 'Hooks/useAppTheme'

import Secret from './Components/Secret'
import View from './Components/View'
import Overview from './Views/Overview'
import Calendar from './Views/Calendar'
import Groceries from './Views/Groceries'
import Cats from './Views/Cats'
import Options from './Views/Options'

import 'Styles/index.scss'
import 'Styles/Suite/suite.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const Suite: React.FC<Props> = (props) => {
	const { socket, state, dispatch } = props

	const [auth, setAuth] = useState<boolean>(false)
	const { setModeValue } = useAppMode()
	const { setThemeValues } = useAppTheme()

	function dispatchView(value: string) {
		setComponent({ [value]: true })
	}

	const suiteProps = {
		socket,
		state,
		dispatch,
		dispatchView
	}
	const authProps = {
		auth,
		setAuth
	}
	const optionProps = {
		...suiteProps,
		...authProps,
		setModeValue,
		setThemeValues
	}

	const views = [
		{
			props: suiteProps,
			title: 'Overview',
			component: Overview,
			actions: []
		},
		{
			props: suiteProps,
			title: 'Calendar',
			component: Calendar,
			actions: [
				{ type: 'post', component: '' },
				{ type: 'update', component: '' },
				{ type: 'delete', component: '' }
			]
		},
		{
			props: suiteProps,
			title: 'Groceries',
			component: Groceries,
			actions: [
				{ type: 'post', component: '' },
				{ type: 'delete', component: '' }
			]
		},
		{
			props: suiteProps,
			title: 'Cats',
			component: Cats,
			actions: [
				{ type: 'update', component: '' }
			]
		},
		{
			props: optionProps,
			title: 'Options',
			component: Options,
			actions: []
		},
	]

	const [component, setComponent] = useState<{ [key: string]: boolean }>({ overview: true })
	const [view, setView] = useState(views[0])

	useEffect(() => {
		const view = views.find((v) => component[v.title.toLowerCase()])
		if (view) setView(view)
	}, [component])

	if (!auth) return <Secret {...authProps} />

	return (
		<div id="Suite">
			<View {...view} />
		</div>
	)
}

export default Suite
