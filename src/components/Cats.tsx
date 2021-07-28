import { useEffect, useState } from 'react'
import { GiOpenedFoodCan, GiNuclearWaste } from 'react-icons/gi'
import Api from '../api'

import '../styles/cats.scss'

const Cats: React.FC = () => {

	const [offsets, setOffsets] = useState<CatOffsets>({
		food: 0,
		waste: 0
	})
	const [schedule, setSchedule] = useState([])

	const date = new Date()

	const minusOne = date.getDate() - 1
	const today = date.getDate()
	const plusTwo = date.getDate() + 1

	useEffect(() => {
		const DAYS = [minusOne, today, plusTwo]
		const WASTE_INTERVAL = 3
		const newSchedule: any = []
		let wasteDay = offsets.waste
		for (let i = 0; i < DAYS.length; i++) {
			const dayOfMonth = i + 1
			let isFood = dayOfMonth % 2 !== offsets.food
			let isWaste = false
			if (dayOfMonth > offsets.waste) {
				isWaste = i === wasteDay
			}
			if (i === wasteDay) wasteDay = wasteDay + WASTE_INTERVAL
			newSchedule.push({
				date: DAYS[i],
				isFood,
				isWaste
			})
		}

		setSchedule(newSchedule);
	}, [offsets])

	useEffect(() => {
		(async () => Api.GetCatOffsets().then(os => {
			console.log({ Offsets: os })

			setOffsets({
				food: os.food,
				waste: os.waste
			})
		}))()
	}, [])

	const isToday = (day: { date: number }, cl: string) => {
		return day.date === today ? cl + ' today' : cl
	}

	return (
		<div className="cat-schedule">
			<h1>Cats</h1>
			<div className="schedule">
				{schedule.map((day: any, i) => (
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

export default Cats