import React, { useEffect, useState } from 'react'

import Div100vh from 'react-div-100vh'
import Secret from './Secret'
import CalendarTab from './Tabs/CalendarTab'
import CatTab from './Tabs/CatTab'
import GroceryTab from './Tabs/GroceryTab'
import OptionTab from './Tabs/OptionTab'

import '../../Styles/index.scss'
import '../../Styles/Suite/suite.scss'
import '../../Styles/Suite/tab.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const Suite: React.FC<Props> = (props) => {
	const [auth, setAuth] = useState<boolean>(false)
	const [mode, setMode] = useState<boolean>(false)

	useEffect(() => {
		const lsMode = localStorage.getItem('Swt-Mode')
		if (!lsMode) return

		const mode = JSON.parse(lsMode)
		if (mode['--modebg'] !== 'white') setMode(true)
		document.documentElement.style.setProperty('--modebg', mode['--modebg'])
		document.documentElement.style.setProperty('--modefont', mode['--modefont'])
	}, [])

	return (
		<Div100vh>
			{!auth
				? <Secret auth={auth} setAuth={setAuth} />
				: (
					<main id="Suite" dir="ltr">
						<Tab title="Calendar" tabIndex={1}>
							<CalendarTab props={props} />
						</Tab>
						<Tab title="Groceries" tabIndex={2}>
							<GroceryTab props={props} />
						</Tab>
						<Tab title="Cats" tabIndex={3}>
							<CatTab props={props} />
						</Tab>
						<Tab title="Options" tabIndex={4}>
							<OptionTab
								props={props}
								auth={auth}
								setAuth={setAuth}
								mode={mode}
								setMode={setMode} />
						</Tab>
					</main>
				)
			}
		</Div100vh>
	)
}

export default Suite

const Tab: React.FC<any> = ({ title, tabIndex, children }) => {
	return (
		<div id="Tab">
			<div className="tab-title">
				<h1 tabIndex={tabIndex}>{title}</h1>
			</div>
			{children}
		</div>
	)
}