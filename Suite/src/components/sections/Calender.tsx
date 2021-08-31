import React, { useState, useEffect } from 'react'
import { format, isSameDay } from 'date-fns'

import Api from '../../api'
import Form from '../Form'
import CalenderForm from '../forms/CalenderForm'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc'
import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../styles/sections/calender.scss'

interface FormState {
	name?: string
	item?: CalenderEvent | undefined
	timed: boolean
	date: string | undefined
	startTime: string | undefined
	endTime: string | undefined
}

const InitAddingForm: FormState = {
	name: '',
	timed: false,
	date: undefined,
	startTime: undefined,
	endTime: undefined
}

const InitUpdatingForm: FormState = {
	item: undefined,
	timed: false,
	date: undefined,
	startTime: undefined,
	endTime: undefined
}

const Calender: React.FC<any> = ({ readOnly }) => {
	const [isAdding, setAddingState] = useState(false)
	const [isUpdating, setUpdatingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [eventList, setEventList] = useState<Array<CalenderEvent>>([])
	const [addingForm, setAddingForm] = useState(InitAddingForm)
	const [updatingForm, setUpdatingForm] = useState(InitUpdatingForm)

	const toggleAdding = () => setAddingState(s => !s)
	const toggleUpdating = () => setUpdatingState(s => !s)
	const toggleRemoving = () => setRemovingState(s => !s)

	function resetAddingState() {
		setAddingForm(InitAddingForm)
		setAddingState(false)
	}

	function resetUpdatingState() {
		setUpdatingForm(InitUpdatingForm)
		setUpdatingState(false)
	}

	async function RemoveEvent(event: CalenderEvent) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${event.name}' ?`);
		if (confirmation) {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.RemoveCalenderEvent(event).then(ce => setEventList(ce))
		}
	}

	async function PostEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(addingForm.date!))
		if (!isAdding || !addingForm.name || !invalidDate) return

		const evDate = new Date(addingForm.date!)
		let event = {
			name: addingForm.name,
			date: evDate.toJSON(),
			timed: addingForm.timed
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(event);
		Api.PostCalenderEvent(event).then(ce => {
			resetAddingState()
			setEventList(ce)
		})
	}

	async function UpdateEvent(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updatingForm.date!))
		if (!updatingForm.date! || !invalidDate) return

		const upDate = new Date(updatingForm.date!)

		const event = {
			id: updatingForm.item?._id,
			date: upDate.toJSON(),
			timed: updatingForm.timed
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(event);
		Api.UpdateCalenderEvent(event).then(ce => {
			resetUpdatingState()
			setEventList(ce)
		})
	}

	useEffect(() => {
		(async () => Api.GetCalenderEvents().then(ce => {
			console.log({ CalenderEvents: ce })
			setEventList(ce)
		}))()
	}, [])

	return (
		<>
			<div className="section-scroll">
				{(() => {

					if (isAdding) return (
						<Form title="Add Event">
							<CalenderForm
								submit={PostEvent}
								form={addingForm}
								setform={setAddingForm} />
						</Form>
					)

					if (isUpdating && updatingForm.item) return (
						<Form title={`Update ${updatingForm.item.name}`}>
							<CalenderForm
								submit={UpdateEvent}
								form={updatingForm}
								setform={setUpdatingForm} />
						</Form>
					)

					return (
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
												? RemoveEvent(event)
												: isUpdating && !updatingForm.item
													? setUpdatingForm({ ...updatingForm, item: event })
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
					)
				})()}
			</div>

			<ActionBar>
				<ActionBarButton
					is={isAdding}
					click={toggleAdding}
					cancel={resetAddingState}
					render={<VscDiffAdded />} />
				<ActionBarButton
					is={isUpdating}
					click={toggleUpdating}
					cancel={resetUpdatingState}
					render={<MdSystemUpdateAlt />} />
				<ActionBarButton
					is={isRemoving}
					click={toggleRemoving}
					cancel={toggleRemoving}
					render={<VscDiffRemoved />} />
			</ActionBar>
		</>
	)
}

export default Calender