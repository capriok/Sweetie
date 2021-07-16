import { getDaysInMonth } from 'date-fns';
import { useEffect, useState } from 'react'

interface Items {
	name: string;
	cycle: number;
	offset: number;
}

const PlantSchedule: React.FC = () => {

	const plantList = [
		{ name: 'Snake Plant', cycle: 8, offset: 0 },
		{ name: 'Zebra Plant', cycle: 4, offset: 0 },
		{ name: 'Taco Shells', cycle: 4, offset: 0 },
		{ name: 'Spikey Boy', cycle: 4, offset: 0 },
		{ name: 'Coleus', cycle: 2, offset: 0 },
		{ name: 'Cottage Cheese', cycle: 3, offset: 0 },
		{ name: 'Umbrella Plant', cycle: 3, offset: 0 },
		{ name: 'Ponytail Palm', cycle: 3, offset: 0 },
		{ name: 'Joint Plant', cycle: 5, offset: 0 },
		{ name: 'Spider Plant', cycle: 6, offset: 0 },
		{ name: 'Regular Pathos', cycle: 5, offset: 0 },
		{ name: 'Heart Pathos', cycle: 5, offset: 0 }
	]

	const [schedule, setSchedule] = useState<Array<Items>>([])

	const ex = [
		{
			date: 1,
			plantsToWater: [
				{ name: 'Snake Plant' }
			]
		}
	]

	useEffect(() => {
		console.log('MAKING NEW SCHEDULE');

		const newSchedule: any = []

		for (let i = 0; i < getDaysInMonth(new Date()); i++) {
			let dayOfMonth = i + 1
			for (let p = 0; p < plantList.length - 1; p++) {

			}
		}

		setSchedule(newSchedule)
	}, [])

	return (
		<div>
			<h1>Plants</h1>
		</div>
	)
}

export default PlantSchedule