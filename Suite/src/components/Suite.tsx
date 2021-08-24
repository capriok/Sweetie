import React from 'react'

import '../styles/suite.scss'
import '../styles/section.scss'

import Calender from './sections/Calender'
import Cats from './sections/Cats'
import Groceries from './sections/Groceries'
import Plants from './sections/Plants'
import Tasks from './sections/Tasks'
import Section from './Section'

const Suite: React.FC<any> = ({ readOnly }) => {
	return (
		<main id="Suite" dir="ltr">
			<Section title="Calender">
				<Calender readOnly={readOnly} />
			</Section>
			<Section title="Groceries">
				<Groceries readOnly={readOnly} />
			</Section>
			<Section title="Tasks">
				<Tasks readOnly={readOnly} />
			</Section>
			<Section title="Cats">
				<Cats readOnly={readOnly} />
			</Section>
			<Section title="Plants">
				<Plants readOnly={readOnly} />
			</Section>
		</main>
	)
}

export default Suite