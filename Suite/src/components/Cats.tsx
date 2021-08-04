import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { isSameDay, startOfDay } from 'date-fns'

import Api from '../api'
import SlideModal from './SlideModal'
import '../styles/cats.scss'

import { MdSystemUpdateAlt } from 'react-icons/md'
import { addDays } from 'date-fns/esm'

const Cats: React.FC = () => {
	const [updating, setUpdating] = useState(false)
	const [schedule, setSchedule] = useState<Array<CatScheduleDay>>([])
	const [catDays, setCatDays] = useState<CatDays>({
		lastFoodDay: undefined,
		lastWasteDay: undefined
	})
	const [lfd, setLfd] = useState<any>(undefined)
	const [lwd, setLwd] = useState<any>(undefined)

	function ResetUpdateFormState() {
		setLfd(undefined)
		setLwd(undefined)
		setUpdating(false)
	}

	const outClickRef = useRef()
	useOutsideClick(outClickRef, () => {
		if (!updating) return
		ResetUpdateFormState()
	})

	async function postDays(e: any) {
		e.preventDefault()

		const foodSame = isSameDay(new Date(catDays.lastFoodDay!), new Date(lfd))
		const wasteSame = isSameDay(new Date(catDays.lastWasteDay!), new Date(lwd))

		if (foodSame && wasteSame) return

		const lastFoodDay = startOfDay(addDays(new Date(lfd), 1)).toJSON()
		const lastWasteDay = startOfDay(addDays(new Date(lwd), 1)).toJSON()

		const days = { lastFoodDay, lastWasteDay }
		Api.PostCatDays(days).then(cd => {
			ResetUpdateFormState()
			setCatDays(cd)
		})
	}

	useEffect(() => {
		(async () => Api.GetCatDays().then(cd => {
			setLfd(cd.lastFoodDay)
			setLwd(cd.lastWasteDay)
			console.log({ CatDays: cd })
			setCatDays(cd)
		}))()
	}, [])

	useEffect(() => {
		if (!catDays.lastFoodDay || !catDays.lastWasteDay) return
		(async () => Api.GetCatSchedule().then(cs => {
			console.log({ Schedule: cs })
			setSchedule(cs)
		}))()
	}, [catDays])

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
					{schedule.map((day, i) => (
						<div className="item" key={i}>
							<div className="day">
								<p>{new Date(day.date).toLocaleDateString('en-us',
									{ weekday: 'short', month: 'short', day: 'numeric' })}</p>
							</div>
							<div className="food">
								<input readOnly type="radio" checked={day.food.is} />
							</div>
							<div className="waste">
								<input readOnly type="radio" checked={day.waste.is} />
							</div>
						</div>
					))}

				</div>
				<div className="action-btns">
					<button onClick={() => setUpdating(!updating)}><MdSystemUpdateAlt /></button>
				</div>
			</section>
			{updating &&
				<SlideModal
					title="Cat Days"
					smref={outClickRef}
					close={() => ResetUpdateFormState()}>
					<form onSubmit={(e) => postDays(e)} className="cats">
						<div className="days">
							<label>
								<p>Last Food Day</p>
								<input
									type="date"
									value={lfd}
									onChange={(e) => setLfd(e.target.value)} />
							</label>
							<label>
								<p>Last Waste Day</p>
								<input
									type="date"
									value={lwd}
									onChange={(e) => setLwd(e.target.value)} />
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