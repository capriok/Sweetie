import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './slide-modal'
import Api from '../api'
import '../styles/cats.scss'

export interface CatOffsets {
	food: {
		offset: number
	}
	waste: {
		offset: number
	}
}

const Cats: React.FC = () => {
	const [editing, toggleEdit] = useState(false)

	const [schedule, setSchedule] = useState<any>([])

	const [offsets, setOffsets] = useState({
		food: 0,
		waste: 0
	})

	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!editing) return
		toggleEdit(false)
	})

	async function postOffsets(e: any) {
		e.preventyDefault()
	}

	const date = new Date()

	const priorTwo = date.getDate() - 2
	const priorOne = date.getDate() - 1
	const today = date.getDate()
	const postOne = date.getDate() + 1
	const postTwo = date.getDate() + 2

	useEffect(() => {

		(async () => Api.GetCatOffsets().then(os => {
			setOffsets({
				food: os.food.offset,
				waste: os.waste.offset
			})
		}))()

	}, [])


	useEffect(() => {
		const DAYS = [priorOne, priorTwo, today, postOne, postTwo]
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

		console.log({ Offsets: offsets })

	}, [offsets])

	return (
		<>
			<section>
				<h1>Cats</h1>
				<div className="content cats">
					<div className="head">
						<p>Day</p>
						<p>Food</p>
						<p>Waste</p>
					</div>
					{schedule.map((day: any, i: number) => (
						<div className="item" key={i}>
							<div>
								<p className="day">{day.date}</p>
							</div>
							<div>
								<input className="food" readOnly type="radio" checked={day.isFood} />
							</div>
							<div>
								<input className="waste" readOnly type="radio" checked={day.isWaste} />
							</div>
						</div>
					))}

				</div>
				<div className="action-btns">
					<button onClick={() => toggleEdit(!editing)}>Edit</button>
				</div>
			</section>
			{editing &&
				<SlideModal smref={modalRef} close={() => toggleEdit(!editing)} title="Offsets">
					<form onSubmit={(e) => postOffsets(e)} className="cats">
						<div className="offsets">
							<input
								type="number"
								min={0}
								max={3}
								placeholder="Food Offset"
								onChange={(e) => setOffsets({ ...offsets, food: parseInt(e.target.value) })} />
							<input
								type="number"
								min={0}
								max={4}
								placeholder="Waste Offset"
								onChange={(e) => setOffsets({ ...offsets, waste: parseInt(e.target.value) })} />
						</div>
						<button className="submit" type="submit">Submit</button>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default Cats