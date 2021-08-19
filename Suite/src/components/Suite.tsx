import React from 'react'

import '../styles/suite.scss'
import '../styles/section.scss'

import Calender from './sections/Calender'
import Cats from './sections/Cats'
import Groceries from './sections/Groceries'
import Plants from './sections/Plants'
import Tasks from './sections/Tasks'
import Section from './Section'

const Suite: React.FC = () => {
	return (
		<main id="Suite" dir="ltr">
			<Section title="Calender">
				<Calender />
			</Section>
			<Section title="Groceries">
				<Groceries />
			</Section>
			<Section title="Tasks">
				<Tasks />
			</Section>
			<Section title="Cats">
				<Cats />
			</Section>
			<Section title="Plants">
				<Plants />
			</Section>
		</main>
	)
}

export default Suite