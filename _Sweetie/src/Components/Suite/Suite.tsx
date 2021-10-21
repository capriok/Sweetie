import React from 'react'

import '../../Styles/Suite/index.scss'
import '../../Styles/Suite/suite.scss'
import '../../Styles/Suite/tab.scss'

import Calendar from './Tabs/Calendar'
import Cats from './Tabs/Cats'
import Groceries from './Tabs/Groceries'
import Options from './Tabs/Options'

const Suite: React.FC<any> = (props) => {
	return (
		<main id="Suite" dir="ltr">
			<Tab title="Calender" tabIndex={1}>
				<Calendar props={props} />
			</Tab>
			<Tab title="Groceries" tabIndex={2}>
				<Groceries props={props} />
			</Tab>
			<Tab title="Cats" tabIndex={3}>
				<Cats props={props} />
			</Tab>
			<Tab title="Options" tabIndex={4}>
				<Options props={props} />
			</Tab>
		</main>
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