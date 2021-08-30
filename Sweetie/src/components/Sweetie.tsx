import React, { useEffect } from 'react'

import DateTime from './sections/DateTime';
import Weather from './sections/Weather';
import Calender from './sections/Calender';
import Groceries from './sections/Groceries';
import TaskList from './sections/Tasks';
import Cats from './sections/Cats';
import Plants from './sections/Plants';

import '../styles/index.scss'

const Sweetie: React.FC<any> = () => {

	useEffect(() => {
		setTimeout(() => {
			window.location.reload()
		}, 300000)
	}, [])

	return (
		<>
			<div id="Sweetie">
				<main>
					<section id="time">
						<DateTime />
					</section>
					<section id="weather">
						<Weather />
					</section>
					<section id="calender">
						<Calender />
					</section>
					<section id="grocerylist">
						<Groceries />
					</section>
					<section id="tasklist">
						<TaskList />
					</section>
					<section id="cats">
						<Cats />
					</section>
					<section id="plants">
						<Plants />
					</section>
				</main>
			</div>
			<div id="Background"></div>
		</>
	)
}

export default Sweetie