import React, { useState } from 'react'

import Div100vh from 'react-div-100vh'
import Secret from './Auth/Secret'
import CalendarTab from './Tabs/CalendarTab'
import CatTab from './Tabs/CatTab'
import GroceryTab from './Tabs/GroceryTab'
import OptionTab from './Tabs/OptionTab'

import '../../Styles/index.scss'
import '../../Styles/Suite/Suite.scss'
import '../../Styles/Suite/Tab.scss'
import useDarkMode from '../../Hooks/useDarkMode'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const Suite: React.FC<Props> = (props) => {
	const [auth, setAuth] = useState<boolean>(false)
	const { mode, setMode } = useDarkMode()

	return (
		<Div100vh>
			{!auth
				? <Secret auth={auth} setAuth={setAuth} />
				: <main id="Suite" dir="ltr">
					<Tab title="Calendar" tabIndex={1}>
						<CalendarTab {...props} />
					</Tab>
					<Tab title="Groceries" tabIndex={2}>
						<GroceryTab {...props} />
					</Tab>
					<Tab title="Cats" tabIndex={3}>
						<CatTab {...props} />
					</Tab>
					<Tab title="Options" tabIndex={4}>
						<OptionTab
							auth={auth}
							setAuth={setAuth}
							mode={mode}
							setMode={setMode} />
					</Tab>
				</main>
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