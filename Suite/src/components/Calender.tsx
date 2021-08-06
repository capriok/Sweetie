import React, { useState, useRef, useMemo } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { addDays, format, startOfDay } from 'date-fns'
import short from 'short-uuid'

import Api from '../api'
import SlideModal from './SlideModal'
import './styles/calender.scss'

import { CgMaximize, CgMinimize } from 'react-icons/cg'
import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'
import { MdSystemUpdateAlt } from 'react-icons/md'

const Calender: React.FC = () => {
	const [is, set] = useState({
		viewing: false,
		adding: false,
		removing: false,
		updating: false
	})
	const [eventList, setEventList] = useState<Array<CalenderEvent>>([])
	const [name, setName] = useState('')
	const [timed, setTimed] = useState(false)
	const [date, setDate] = useState<any>(undefined)

	const [updateCalenderEventItem, setUpdateCalenderEventItem] = useState<CalenderEvent | undefined>(undefined)
	const [updateDate, setUpdateDate] = useState<any>(undefined)
	const [updateTimed, setUpdateTimed] = useState(false)

	function ResetSetState() {
		set({ viewing: false, adding: false, removing: false, updating: false })
	}

	function ResetAddFormState() {
		setName('')
		setTimed(false)
		setDate(undefined)
		set({ ...is, adding: false })
	}

	function ResetUpdateFormState() {
		setUpdateCalenderEventItem(undefined)
		setUpdateDate(undefined)
		setUpdateTimed(false)
		set({ ...is, updating: false })
	}

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!is.adding && !is.removing && !is.updating) return
		if (is.updating && !updateCalenderEventItem) return
		ResetSetState()
		ResetAddFormState()
		ResetUpdateFormState()
	})

	function AddBtnClick() {
		set({ ...is, adding: !is.adding })
	}

	async function UpdateBtnClick() {
		set({ ...is, updating: !is.updating })
	}

	function RemoveBtnClick() {
		set({ ...is, removing: !is.removing })
	}

	async function removeEvent(event: CalenderEvent) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove '${event.name}' ?`);
		if (confirmation) {
			Api.RemoveCalenderEvent(event).then(ce => setEventList(ce))
		}
	}

	async function postEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(date))
		if (!is.adding || !name || !invalidDate) return

		let evDate = addDays(new Date(date), 1).toJSON()
		let event = { id: short.generate(), name, date: evDate, timed }
		console.log(startOfDay(addDays(new Date(date), 1)).toJSON());

		Api.PostCalenderEvent(event).then(ce => {
			ResetAddFormState()
			setEventList(ce)
		})
	}

	async function updateCalenderEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updateDate))
		if (!updateDate || !updateTimed || !invalidDate) return

		const upDate = addDays(new Date(updateDate), 1).toJSON()
		const calenderEv = {
			id: updateCalenderEventItem!.id,
			name: updateCalenderEventItem!.name,
			date: upDate,
			timed: updateCalenderEventItem!.timed
		}
		console.log(updateCalenderEventItem);
		console.log(calenderEv);

		Api.UpdateCalenderEvent(calenderEv).then(ce => setEventList(ce))
	}

	useMemo(() => {
		(async () => Api.GetCalenderEvents().then(ce => {
			console.log({ CalenderEvents: ce })
			setEventList(ce)
		}))()
	}, [])

	return (
		<>
			<section ref={outClickRef}>
				<h1 className="title">Calender</h1>
				<div className="content calender">
					<div className="head">
						<p>Event</p>
						<p>Date</p>
						<p>Time</p>
					</div>
					{eventList.slice(0, is.viewing ? eventList.length : 7).map((event, i) =>
						<div className="event" key={i}
							onClick={() => {
								return is.removing
									? removeEvent(event)
									: is.updating && !updateCalenderEventItem
										? setUpdateCalenderEventItem(event)
										: null
							}}>
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
				{eventList.length > 7 &&
					<p className="viewing-btn" onClick={() => set({ ...is, viewing: !is.viewing })}>
						{is.viewing ? <CgMinimize /> : <CgMaximize />}
					</p>
				}
				{is.adding
					? <div className="action-btns">
						<button onClick={AddBtnClick}><VscDebugStop /></button>
					</div>
					: is.removing
						? <div className="action-btns">
							<button onClick={RemoveBtnClick}><VscDebugStop /></button>
						</div>
						: is.updating
							? <div className="action-btns">
								<button onClick={UpdateBtnClick}><VscDebugStop /></button>
							</div>
							: <div className="action-btns">
								<button onClick={AddBtnClick}><VscDiffAdded /></button>
								<button onClick={UpdateBtnClick}><MdSystemUpdateAlt /></button>
								<button onClick={RemoveBtnClick}><VscDiffRemoved /></button>
							</div>
				}
			</section>
			{is.adding &&
				<SlideModal
					title="Add Event"
					smref={outClickRef}
					close={() => ResetAddFormState()}>
					<form onSubmit={(e) => postEvent(e)} className="calender">
						<div className="name-timed">
							<input
								name="name"
								type="text"
								placeholder="Event name"
								autoComplete="off"
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
			{(is.updating && updateCalenderEventItem) &&
				<SlideModal
					title={`Update ${updateCalenderEventItem.name}`}
					smref={outClickRef}
					close={() => ResetUpdateFormState()}>
					<form onSubmit={(e) => updateCalenderEvent(e)} className="calender">
						<div className="name-timed">
							<label className="timed">
								<span>Timed</span>
								<input
									type="checkbox"
									checked={updateTimed}
									onChange={(e) => setUpdateTimed(e.target.checked)} />
							</label>
						</div>
						{updateTimed ?
							<div className="time">
								<div><p>Event Date + Time</p></div>
								<input type="datetime-local" onChange={(e) => setUpdateDate(e.target.value)} />
							</div>
							: <div className="date">
								<div><p>Event Date</p></div>
								<input type="date" onChange={(e) => setUpdateDate(e.target.value)} />
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