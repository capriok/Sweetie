import React, { useState } from 'react'
import useAppMode from 'Hooks/useAppMode'
import useAppTheme from 'Hooks/useAppTheme'

import Secret from './Components/Auth/Secret'
import ViewMotion from './Components/View/Motion'
import View from './Components/View/View'
import Overview from './Views/Overview'
import Calendar from './Views/Calendar'
import CalendarPost from './Forms/Calendar/Post'
import CalendarUpdate from './Forms/Calendar/Update'
import CalendarDelete from './Forms/Calendar/Delete'
import Grocery from './Views/Grocery'
import GroceryPost from './Forms/Grocery/Post'
import GroceryDelete from './Forms/Grocery/Delete'
import Cats from './Views/Cats'
import CatsUpdate from './Forms/Cats/Update'
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

	const [component, setComponent] = useState<{ [key: string]: boolean }>({ overview: true })

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

	const fromLeftVariants = {
		hidden: { opacity: 0, y: 0, x: -300 },
		visible: { opacity: 1, y: 0, x: 0 },
		exit: { opacity: 0, y: 0, x: -300 }
	}
	const fromRightVariants = {
		hidden: { opacity: 0, y: 0, x: 300 },
		visible: { opacity: 1, y: 0, x: 0 },
		exit: { opacity: 0, y: 0, x: 300 }
	}

	if (!auth) return <Secret {...authProps} />

	return (
		<div id="Suite">
			<ViewMotion
				visible={component.overview}
				variants={fromLeftVariants}
				component={
					<View
						title="Overview"
						props={suiteProps}
						component={Overview}
						actions={[]}
					/>
				} />
			<ViewMotion
				visible={component.calendar}
				variants={fromRightVariants}
				component={
					<View
						title="Calendar"
						props={suiteProps}
						component={Calendar}
						actions={[
							{ type: 'post', component: CalendarPost },
							{ type: 'update', component: CalendarUpdate },
							{ type: 'delete', component: CalendarDelete }
						]}
					/>
				} />
			<ViewMotion
				visible={component.grocery}
				variants={fromRightVariants}
				component={
					<View
						title="Grocery"
						props={suiteProps}
						component={Grocery}
						actions={[
							{ type: 'post', component: GroceryPost },
							{ type: 'delete', component: GroceryDelete }
						]}
					/>
				} />
			<ViewMotion
				visible={component.cats}
				variants={fromRightVariants}
				component={
					<View
						title="Cats"
						props={suiteProps}
						component={Cats}
						actions={[
							{ type: 'update', component: CatsUpdate }
						]}
					/>
				} />
			<ViewMotion
				visible={component.options}
				variants={fromRightVariants}
				component={
					<View
						title="Options"
						props={optionProps}
						component={Options}
						actions={[]}
					/>
				} />
		</div>
	)
}

export default Suite
