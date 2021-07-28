import React, { useEffect, useState, useRef } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { format } from 'date-fns'
import SlideModal from './SlideModal'
import Api from '../api'
import short from 'short-uuid'

import '../styles/calender.scss'

const Calender: React.FC = () => {
	const [is, set] = useState({
		viewing: false,
		adding: false,
		removing: false
	})
	const [eventList, setEventList] = useState<Array<CalenderEvent>>([])
	const [name, setName] = useState('')
	const [timed, setTimed] = useState(false)
	const [date, setDate] = useState<any>(undefined)

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!is.adding && !is.removing) return
		set({ viewing: false, adding: false, removing: false })
	})

	function AddBtnClick() {
		set({ ...is, adding: !is.adding })
	}

	function RemoveBtnClick() {
		set({ ...is, removing: !is.removing })
	}

	async function removeEvent(event: CalenderEvent) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove "${event.name}" ?`);
		if (confirmation) {
			Api.RemoveCalenderEvent(event).then(ce => setEventList(ce))
		}
	}

	async function postEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(date))

		if (!is.adding || !name || !invalidDate) return

		let event = { id: short.generate(), name: name, date: date, timed: timed }

		Api.PostCalenderEvent(event).then(ce => setEventList(ce))
	}

	useEffect(() => {
		(async () => Api.GetCalenderEvents().then(ce => setEventList(ce)))()
	}, [])

	useEffect(() => {
		eventList.length && console.log({ CalenderEvents: eventList })
	}, [eventList])

	return (
		<>
			<section ref={outClickRef}>
				<h1 className="title">Calender</h1>
				<div className="content calender">
					<div className="head">
						<p>Name</p>
						<p>Date</p>
						<p>Time</p>
					</div>
					{eventList.slice(0, is.viewing ? eventList.length : 5).map((event, i) =>
						<div className="event" key={i} onClick={() => removeEvent(event)}>
							<div className="name">
								<p>{event.name}</p>
							</div>
							<div className="date">
								<p>
									{new Date(event.date).toLocaleDateString('en-us',
										{ weekday: 'short', month: 'short', day: 'numeric' })}
								</p>
							</div>
							<div className="time">
								<p>{event.timed ? format(new Date(event.date), 'p') : ''}</p>
							</div>
						</div>
					)}
				</div>
				<div className="action-btns">
					<button onClick={AddBtnClick} disabled={is.removing}>Add</button>
					<button disabled={is.removing} onClick={() => set({ ...is, viewing: !is.viewing })}>
						{is.viewing ? 'Minimize' : 'View All Events'}
					</button>
					<button onClick={RemoveBtnClick}>{is.removing ? 'Done' : 'Remove'}</button>
				</div>
			</section>
			{is.adding &&
				<SlideModal smref={outClickRef} close={() => set({ ...is, adding: false })} title="Add Event">
					<form onSubmit={(e) => postEvent(e)} className="calender">
						<div className="name-timed">
							<input
								name="name"
								type="text"
								placeholder="Event name"
								onChange={(e) => setName(e.target.value)} />
							<label className="timed">
								<span>Timed</span>
								<input
									type="checkbox"
									checked={timed}
									onChange={(e) => setTimed(e.target.checked)} />
							</label>
						</div>
						{timed ?
							<div className="time">
								<div><p>Event Date + Time</p></div>
								<input type="datetime-local" onChange={(e) => setDate(e.target.value)} />
							</div>
							: <div className="date">
								<div><p>Event Date</p></div>
								<input type="date" onChange={(e) => setDate(e.target.value)} />
							</div>
						}

						<button className="submit" type="submit">Submit</button>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default Calender