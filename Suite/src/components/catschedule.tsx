import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './slidemodal'
import '../styles/catschedule.scss'

const CatSchedule: React.FC = () => {
	const [editing, toggleEdit] = useState(false)

	const [schedule, setSchedule] = useState<any>([])

	const [foodOffset, setFoodOffset] = useState(0)
	const [wasteOffset, setWasteOffset] = useState(0)

	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!editing) return
		toggleEdit(false)
	})

	async function postSchedule(e: any) {
		e.preventyDefault()
	}

	const date = new Date()

	const priorTwo = date.getDate() - 2
	const priorOne = date.getDate() - 1
	const today = date.getDate()
	const postOne = date.getDate() + 1
	const postTwo = date.getDate() + 2

	useEffect(() => {

		const newSchedule: any = []

		const DAYS = [priorOne, priorTwo, today, postOne, postTwo]

		let wasteDay = wasteOffset
		for (let i = 0; i < DAYS.length; i++) {
			const dayOfMonth = i + 1
			const isFood = dayOfMonth % 2 !== foodOffset
			let isWaste = false
			if (dayOfMonth > wasteOffset) {
				isWaste = i === wasteDay
			}
			console.log(isFood, isWaste);

			if (i === wasteDay) wasteDay = wasteDay + 3
			newSchedule.push({
				date: DAYS[i],
				isFood,
				isWaste
			})
		}

		setSchedule(newSchedule)
	}, [])

	return (
		<>
			<section>
				<h1>Cat Schedule</h1>
				<div className="cat-schedule">
					<div className="schedule">
						{schedule.map((day: any, i: number) => (
							<div className="item" key={i}>
								<p className="day">{day.date}</p>
								<div>
									<input readOnly type="radio" checked={day.isFood} />
									<input readOnly type="radio" checked={day.isWaste} />
								</div>
							</div>
						))}
					</div>
					<div className="indicators">
						<div>Food | Waste</div>
					</div>
				</div>
				<div className="buttons">
					<button onClick={() => toggleEdit(!editing)}>Edit</button>
				</div>
			</section>
			{editing &&
				<SlideModal smref={modalRef} close={() => toggleEdit(!editing)} title="Add Task">
					<form onSubmit={(e) => postSchedule(e)}>
						<div className="cats">
							<input
								type="number"
								min={0}
								placeholder="Food Offset"
								onChange={(e) => setFoodOffset(parseInt(e.target.value))} />
							<input
								type="number"
								min={0}
								placeholder="Waste Offset"
								onChange={(e) => setWasteOffset(parseInt(e.target.value))} />
						</div>
						<button className="submit" type="submit">Submit</button>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default CatSchedule