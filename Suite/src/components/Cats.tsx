import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './SlideModal'
import Api from '../api'
import '../styles/cats.scss'
import { addDays, isSameDay, startOfDay } from 'date-fns'

const Cats: React.FC = () => {

	const [editing, toggleEdit] = useState(false)
	const [schedule, setSchedule] = useState<any>([])
	const [catDays, setCatDays] = useState<CatDays>({
		lastFoodDay: undefined,
		lastWasteDay: undefined
	})
	const [lfd, setLfd] = useState<any>(undefined)
	const [lwd, setLwd] = useState<any>(undefined)

	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!editing) return
		toggleEdit(false)
	})

	async function postDays(e: any) {
		e.preventDefault()

		const foodSame = isSameDay(new Date(catDays.lastFoodDay!), new Date(lfd))
		const wasteSame = isSameDay(new Date(catDays.lastWasteDay!), new Date(lwd))

		if (foodSame && wasteSame) return

		const lastFoodDay = startOfDay(new Date(lfd)).toJSON()
		const lastWasteDay = startOfDay(new Date(lwd)).toJSON()

		const days = { lastFoodDay, lastWasteDay }
		console.log(days);
		Api.PostCatDays(days).then(cd => setCatDays(cd))
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
					{schedule.map((day: any, i: number) => (
						<div className="item" key={i}>
							<div className="day">
								<p>{new Date(day.date).toLocaleDateString('en-us',
									{ weekday: 'short', month: 'short', day: 'numeric' })}</p>
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
				<SlideModal smref={modalRef} close={() => toggleEdit(!editing)} title="Cat Days">
					<form onSubmit={(e) => postDays(e)} className="cats">
						<div className="days">
							<label>
								<p>Last Food Day</p>
								<input
									type="date"
									onChange={(e) => setLfd(e.target.value)} />
							</label>
							<label>
								<p>Last Waste Day</p>
								<input
									type="date"
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