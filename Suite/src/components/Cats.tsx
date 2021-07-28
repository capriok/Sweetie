import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './SlideModal'
import Api from '../api'
import '../styles/cats.scss'

const Cats: React.FC = () => {

	const [editing, toggleEdit] = useState(false)
	const [schedule, setSchedule] = useState<any>([])
	const [catOffsets, setCatOffsets] = useState<CatOffsets>({
		food: 0,
		waste: 0
	})
	const [foodOffset, setFoodOffset] = useState<number>(catOffsets.food)
	const [wastOffset, setWasteOffset] = useState<number>(catOffsets.waste)


	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!editing) return
		toggleEdit(false)
	})

	function FoodChange(e: any) {
		const min = 0
		const max = 1
		let value = parseInt(e.target.value)

		if (value < min) value = max
		if (value > max) value = min

		console.log(value);

		setFoodOffset(value)
	}

	function WasteChange(e: any) {
		const min = 0
		const max = 3
		let value = parseInt(e.target.value)

		if (value < min) value = max
		if (value > max) value = min

		setWasteOffset(value)
	}


	async function postOffsets(e: any) {
		e.preventDefault()

		const foodSame = catOffsets.food === foodOffset
		const wasteSame = catOffsets.waste === wastOffset
		if (foodSame && wasteSame) return

		const offsets = { food: foodOffset, waste: wastOffset }

		Api.PostOffsets(offsets).then(co => setCatOffsets(co))
	}

	useEffect(() => {

		(async () => Api.GetCatOffsets().then(os => {
			setCatOffsets({
				food: os.food,
				waste: os.waste
			})
		}))()

	}, [])

	const date = new Date()

	const minusTwo = date.getDate() - 2
	const minusOne = date.getDate() - 1
	const today = date.getDate()
	const plusOne = date.getDate() + 1
	const plusTwo = date.getDate() + 2

	useEffect(() => {
		const DAYS = [minusTwo, minusOne, today, plusOne, plusTwo]
		const WASTE_INTERVAL = 3
		const newSchedule: any = []
		let wasteDay = catOffsets.waste
		for (let i = 0; i < DAYS.length; i++) {
			const dayOfMonth = i + 1
			let isFood = dayOfMonth % 2 !== catOffsets.food
			let isWaste = false
			if (dayOfMonth > catOffsets.waste) {
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
	}, [catOffsets])

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
							<div className="day">
								<p>{day.date}</p>
							</div>
							<div className="food">
								<input readOnly type="radio" checked={day.isFood} />
							</div>
							<div className="waste">
								<input readOnly type="radio" checked={day.isWaste} />
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
							<label>
								<p>Food</p>
								<input
									type="number"
									value={foodOffset}
									onChange={(e) => FoodChange(e)} />
							</label>
							<label>
								<p>Waste</p>
								<input
									type="number"
									value={wastOffset}
									onChange={(e) => WasteChange(e)} />
							</label>
						</div>
						<button className="submit" type="submit">Submit</button>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default Cats