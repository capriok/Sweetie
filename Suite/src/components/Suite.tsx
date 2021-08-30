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
			<Section title="Calender" tabIndex={1}>
				<Calender props={props} />
			</Section>
			<Section title="Groceries" tabIndex={2}>
				<Groceries props={props} />
			</Section>
			<Section title="Tasks" tabIndex={3}>
				<Tasks props={props} />
			</Section>
			<Section title="Plants" tabIndex={4}>
				<Plants props={props} />
			</Section>
			<Section title="Cats" tabIndex={5}>
				<Cats props={props} />
			</Section>
			<Section title="Options" tabIndex={6}>
				<Options props={props} />
			</Section>
		</main>
	)
}

export default Suite