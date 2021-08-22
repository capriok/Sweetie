import React, { useState, useEffect, useRef } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { format, isSameDay } from 'date-fns'

import Api from '../../api'
import Modal from '../Modal'
import CalenderAdding from '../modals/Calender-Adding'
import CalenderUpdating from '../modals/Calender-Updating'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc'
import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../styles/sections/calender.scss'

const Calender: React.FC = () => {
	const [is, set] = useState({
		adding: false,
		removing: false,
		updating: false
	})
	const [eventList, setEventList] = useState<Array<CalenderEvent>>([])
	const [name, setName] = useState('')
	const [timed, setTimed] = useState(false)
	const [date, setDate] = useState<any>()

	const [updateCalenderEventItem, setUpdateCalenderEventItem] = useState<any>(undefined)
	const [updateDate, setUpdateDate] = useState<any>()
	const [updateTimed, setUpdateTimed] = useState(false)

	function ResetSetState() {
		set(() => ({ adding: false, removing: false, updating: false }))
	}

	function ResetAddFormState() {
		setName('')
		setTimed(false)
		setDate(undefined)
		set(is => ({ ...is, adding: false }))
	}

	function ResetUpdateFormState() {
		setUpdateCalenderEventItem(undefined)
		setUpdateDate(undefined)
		setUpdateTimed(false)
		set(is => ({ ...is, updating: false }))
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
		set(is => ({ ...is, adding: !is.adding }))
	}

	async function UpdateBtnClick() {
		set(is => ({ ...is, updating: !is.updating }))
	}

	function RemoveBtnClick() {
		set(is => ({ ...is, removing: !is.removing }))
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

		const evDate = new Date(date)
		let event = { name, date: evDate.toJSON(), timed }

		console.log(event);
		Api.PostCalenderEvent(event).then(ce => {
			ResetAddFormState()
			setEventList(ce)
		})
	}

	async function updateCalenderEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updateDate))
		if (!updateDate || !invalidDate) return

		const upDate = new Date(updateDate)

		if (isSameDay(upDate, new Date(updateCalenderEventItem.date))) return

		const calenderEv = {
			id: updateCalenderEventItem?._id,
			date: upDate.toJSON(),
			timed: updateTimed
		}

		console.log(calenderEv);
		Api.UpdateCalenderEvent(calenderEv).then(ce => {
			ResetUpdateFormState()
			setEventList(ce)
		})
	}

	useEffect(() => {
		(async () => Api.GetCalenderEvents().then(ce => {
			console.log({ CalenderEvents: ce })
			setEventList(ce.map(d => {
				if (!d.timed) d.date = tzFormat(d.date)
				return d
			}))
		}))()
	}, [])

	function tzFormat(date: string) {
		const tzDate = new Date(date)
		tzDate.setMinutes(tzDate.getMinutes() + tzDate.getTimezoneOffset())
		return tzDate.toJSON()
	}

	return (
		<>
			<div className="section-scroll" ref={outClickRef}>
				<div className="calender content">
					<div className="content-head">
						<p>Event</p>
						<p>Date</p>
						<p>Time</p>
					</div>
					{eventList.map((event, i) => {
						return (
							<div
								key={i}
								className="content-line with-border"
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
						)
					})}
				</div>
			</div>

			<ActionBar actives={[
				{ is: is.adding, cb: AddBtnClick },
				{ is: is.updating, cb: UpdateBtnClick },
				{ is: is.removing, cb: RemoveBtnClick },
			]}>
				<ActionBarButton click={AddBtnClick} render={<VscDiffAdded />} />
				<ActionBarButton click={UpdateBtnClick} render={<MdSystemUpdateAlt />} />
				<ActionBarButton click={RemoveBtnClick} render={<VscDiffRemoved />} />
			</ActionBar>

			{is.adding &&
				<Modal
					title="Add Event"
					mref={outClickRef}>
					<CalenderAdding
						submit={postEvent}
						name={name}
						setName={setName}
						timed={timed}
						setTimed={setTimed}
						setDate={setDate} />
				</Modal>
			}

			{(is.updating && updateCalenderEventItem) &&
				<Modal
					title={`Update ${updateCalenderEventItem.name}`}
					mref={outClickRef}>
					<CalenderUpdating
						submit={updateCalenderEvent}
						updateTimed={updateTimed}
						setUpdateTimed={setUpdateTimed}
						setUpdateDate={setUpdateDate} />
				</Modal>
			}
		</>
	)
}

export default Calender