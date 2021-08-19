import React, { useState, useEffect, useRef } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { addDays, format, startOfDay, startOfToday } from 'date-fns'

import Api from '../../api'
import Modal from '../Modal'
import CalenderAdding from '../modals/Calender-Adding'
import CalenderUpdating from '../modals/Calender-Updating'
import Actionbar, { ActionBarButton } from '../ActionBar'

import { CgMaximize, CgMinimize } from 'react-icons/cg'
import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc'
import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../styles/sections/calender.scss'

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
	const [date, setDate] = useState<any>(startOfToday())

	const [updateCalenderEventItem, setUpdateCalenderEventItem] = useState<any>(undefined)
	const [updateDate, setUpdateDate] = useState<any>(startOfToday())
	const [updateTimed, setUpdateTimed] = useState(false)

	function ResetSetState() {
		set(() => ({ viewing: false, adding: false, removing: false, updating: false }))
	}

	function ResetAddFormState() {
		setName('')
		setTimed(false)
		setDate(startOfToday())
		set(is => ({ ...is, adding: false }))
	}

	function ResetUpdateFormState() {
		setUpdateCalenderEventItem(undefined)
		setUpdateDate(startOfToday())
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

		const evDate = FormatInputDate(date, timed)
		let event = { name, date: evDate, timed }

		Api.PostCalenderEvent(event).then(ce => {
			ResetAddFormState()
			setEventList(ce)
		})
	}

	async function updateCalenderEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updateDate))
		if (!updateDate || !invalidDate) return

		const upDate = FormatInputDate(updateDate, updateTimed)
		const calenderEv = {
			id: updateCalenderEventItem?._id,
			date: upDate,
			timed: updateTimed
		}

		Api.UpdateCalenderEvent(calenderEv).then(ce => {
			ResetUpdateFormState()
			setEventList(ce)
		})
	}

	function FormatInputDate(date: string, timed: boolean) {
		return timed ? new Date(date).toJSON() : addDays(startOfDay(new Date(date)), 1).toJSON()
	}

	useEffect(() => {
		(async () => Api.GetCalenderEvents().then(ce => {
			console.log({ CalenderEvents: ce })
			setEventList(ce)
		}))()
	}, [])

	return (
		<>
			<div className="section-wrap" ref={outClickRef}>
				<div className="calender content">
					<div className="content-head">
						<p>Event</p>
						<p>Date</p>
						<p>Time</p>
					</div>
					{eventList.slice(0, is.viewing ? eventList.length : 7).map((event, i) =>
						<div className="content-line with-border" key={i}
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
			</div>
			{eventList.length > 7 &&
				<p className="content-view-all" onClick={() => set({ ...is, viewing: !is.viewing })}>
					{is.viewing ? <CgMinimize /> : <CgMaximize />}
				</p>
			}

			<Actionbar actives={[
				[is.adding, AddBtnClick],
				[is.updating, UpdateBtnClick],
				[is.removing, RemoveBtnClick]
			]}>
				<ActionBarButton click={AddBtnClick} render={<VscDiffAdded />} />
				<ActionBarButton click={UpdateBtnClick} render={<MdSystemUpdateAlt />} />
				<ActionBarButton click={RemoveBtnClick} render={<VscDiffRemoved />} />
			</Actionbar>

			{is.adding &&
				<Modal
					title="Add Event"
					mref={outClickRef}>
					<CalenderAdding
						submit={postEvent}
						timed={timed}
						setName={setName}
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
						updateDate={updateDate}
						setUpdateDate={setUpdateDate} />
				</Modal>
			}
		</>
	)
}

export default Calender