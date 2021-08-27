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

const Calender: React.FC<any> = ({ readOnly }) => {
	const [isAdding, setAddingState] = useState(false)
	const [isUpdating, setUpdatingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [eventList, setEventList] = useState<Array<CalenderEvent>>([])
	const [name, setName] = useState('')
	const [timed, setTimed] = useState(false)
	const [date, setDate] = useState<any>()

	const [updateCalenderEventItem, setUpdateCalenderEventItem] = useState<any>(undefined)
	const [updateDate, setUpdateDate] = useState<any>()
	const [updateTimed, setUpdateTimed] = useState(false)

	function ResetStates() {
		setAddingState(false)
		setUpdatingState(false)
		setRemovingState(false)
	}
	const ToggleAdding = () => setAddingState(s => !s)
	const ToggleUpdating = () => setUpdatingState(s => !s)
	const ToggleRemoving = () => setRemovingState(s => !s)
	function ResetAddFormState() {
		setName('')
		setTimed(false)
		setDate(undefined)
		setAddingState(false)
	}

	function ResetUpdateFormState() {
		setUpdateCalenderEventItem(undefined)
		setUpdateDate(undefined)
		setUpdateTimed(false)
		setUpdatingState(false)
	}

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!isAdding && !isRemoving && !isUpdating) return
		if (isUpdating && !updateCalenderEventItem) return
		ResetStates()
		ResetAddFormState()
		ResetUpdateFormState()
	})

	async function removeEvent(event: CalenderEvent) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${event.name}' ?`);
		if (confirmation) {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.RemoveCalenderEvent(event).then(ce => setEventList(ce))
		}
	}

	async function postEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(date))
		if (!isAdding || !name || !invalidDate) return

		const evDate = new Date(date)
		let event = { name, date: evDate.toJSON(), timed }

		if (readOnly) return alert('Not allowed in Read Only mode.')
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

		const event = {
			id: updateCalenderEventItem?._id,
			date: upDate.toJSON(),
			timed: updateTimed
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(event);
		Api.UpdateCalenderEvent(event).then(ce => {
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
									return isRemoving
										? removeEvent(event)
										: isUpdating && !updateCalenderEventItem
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

			<ActionBar>
				<ActionBarButton is={isAdding} click={ToggleAdding} render={<VscDiffAdded />} />
				<ActionBarButton is={isUpdating} click={ToggleUpdating} render={<MdSystemUpdateAlt />} />
				<ActionBarButton is={isRemoving} click={ToggleRemoving} render={<VscDiffRemoved />} />
			</ActionBar>

			{isAdding &&
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

			{(isUpdating && updateCalenderEventItem) &&
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