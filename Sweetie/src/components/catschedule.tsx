import { useEffect, useState } from 'react'
import '../styles/catschedule.scss'

import { GiOpenedFoodCan, GiNuclearWaste } from 'react-icons/gi'
import { getDaysInMonth } from 'date-fns'

interface Items {
	name: string;
	date: number;
	isFood: boolean;
	isWaste: boolean;
}

const CatSchedule: React.FC = () => {
	const [foodOffset, setFoodOffset] = useState(0)
	const [wasteOffset, setWasteOffset] = useState(0)

	const date = new Date()

	const yesterday = date.getDate() - 1
	const today = date.getDate()
	const tomorrow = date.getDate() + 1


	const [schedule, setSchedule] = useState<Array<Items>>([])

	useEffect(() => {

		const newSchedule: any = []

		let wasteDay = wasteOffset
		for (let i = 0; i < getDaysInMonth(new Date()); i++) {
			const dayOfMonth = i + 1
			const isFood = dayOfMonth % 2 !== foodOffset
			let isWaste = false
			if (dayOfMonth > wasteOffset) {
				isWaste = i === wasteDay
			}
			console.log(isFood, isWaste);

			if (i === wasteDay) wasteDay = wasteDay + 3
			newSchedule.push({
				date: dayOfMonth,
				isFood,
				isWaste
			})
		}

		setSchedule(newSchedule)
	}, [])

	const isToday = (day: { date: number }, cl: string) => {
		return day.date === today ? cl + ' today' : cl
	}

	return (
		<div className="cat-schedule">
			<h1>Cats</h1>
			<div className="schedule">
				{schedule.slice(yesterday - 1, tomorrow).map((day, i) => (
					<div className="item" key={i}>
						<p className={isToday(day, 'day')}>{day.date}</p>
						<div className="indicators">
							{day.isFood && <div className={isToday(day, 'food-indicator')}><GiOpenedFoodCan /></div>}
							{day.isWaste && <div className={isToday(day, 'waste-indicator')}><GiNuclearWaste /></div>}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default CatSchedule