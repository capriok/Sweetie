import React from 'react'

import '../styles/suite.scss'
import '../styles/section.scss'

import Calender from './sections/Calender'
import Cats from './sections/Cats'
import Groceries from './sections/Groceries'
import Plants from './sections/Plants'
import Tasks from './sections/Tasks'
import Section from './Section'
import Options from './sections/Options'

const Suite: React.FC<any> = (props) => {
	return (
		<main id="Suite" dir="ltr">
			<Section title="Calender">
				<Calender props={props} />
			</Section>
			<Section title="Groceries">
				<Groceries props={props} />
			</Section>
			<Section title="Tasks">
				<Tasks props={props} />
			</Section>
			<Section title="Cats">
				<Cats props={props} />
			</Section>
			<Section title="Plants">
				<Plants props={props} />
			</Section>
			<Section title="Options">
				<Options props={props} />
			</Section>
		</main>
	)
}

export default Suite