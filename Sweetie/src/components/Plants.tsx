import { getDaysInMonth } from 'date-fns';
import { useEffect, useState } from 'react'

const Plants: React.FC = () => {

	const [plantList, setPlantList] = useState<Array<Plant>>([])
	const [schedule, setSchedule] = useState<any>([])

	const ex = [
		{
			date: 1,
			plantsToWater: [
				{ name: 'Snake Plant' }
			]
		}
	]

	useEffect(() => {
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

			WIP
		</div>
	)
}

export default Plants