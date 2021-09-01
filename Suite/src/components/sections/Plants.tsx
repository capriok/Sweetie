import React, { useEffect, useState } from 'react'

import Api from '../../api'
import Form from '../Form'
import PlantForm from '../forms/PlantForm'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc'
import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../styles/sections/plants.scss'

interface FormState {
	name?: string
	item?: Plant
	cycle: number
	last?: string
}

const InitAddingForm: FormState = {
	name: '',
	cycle: 3,
	last: undefined
}

const InitUpdatingForm: FormState = {
	item: undefined,
	cycle: 3,
	last: undefined
}

const Plants: React.FC<any> = ({ readOnly }) => {
	const [isAdding, setAddingState] = useState(false)
	const [isUpdating, setUpdatingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [schedule, setSchedule] = useState<PlantScheduleDay>({
		date: '',
		plants: []
	})
	const [plantList, setPlantList] = useState<Array<Plant>>([])

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

	function setUpdatingFormItem(plant: Plant) {
		const d = new Date(plant.last)
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
		const formattedDate = d.toISOString().split('T')[0]

		setUpdatingForm({
			...updatingForm,
			item: plant,
			cycle: plant.cycle,
			last: formattedDate,
		})
	}

	async function RemovePlant(plant: Plant) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${plant.name}' ?`);
		if (confirmation) {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.RemovePlant(plant).then(pl => setPlantList(pl))
		}
	}

	async function PostPlant(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(addingForm.last!))
		if (!addingForm.name || !invalidDate) return
		if (addingForm.cycle < 1) return

		const last = new Date(addingForm.last!)
		const plant = {
			name: addingForm.name,
			cycle: addingForm.cycle,
			last: last.toJSON()
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(plant);
		Api.PostPlant(plant).then(pl => {
			resetAddingState()
			setPlantList(pl)
		})
	}

	async function UpdatePlant(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updatingForm.last!))
		if (!updatingForm.last || !invalidDate) return
		if (addingForm.cycle < 1) return

		const last = new Date(updatingForm.last)

		const plant = {
			id: updatingForm.item?._id,
			cycle: updatingForm.cycle,
			last: last.toJSON()
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(plant)
		Api.UpdatePlant(plant).then(pl => {
			resetUpdatingState()
			setPlantList(pl)
		})
	}

	useEffect(() => {
		(async () => Api.GetPlantList().then(pl => {
			console.log({ PlantList: pl })
			setPlantList(pl)
		}))()
	}, [])

	useEffect(() => {
		(async () => Api.GetPlantSchedule().then(({ today, ps }) => {
			console.log({ PlantSchedule: ps })
			if (today) {
				setSchedule(today)
			}
		}))()
	}, [plantList])

	return (
		<>
			<div className="section-scroll">
				{(() => {

					if (isAdding) return (
						<Form title="Add Plant">
							<PlantForm
								submit={PostPlant}
								form={addingForm}
								setForm={setAddingForm} />
						</Form>
					)

					if (isUpdating && updatingForm.item) return (
						<Form title={`Update ${updatingForm.item.name}`}>
							<PlantForm
								submit={UpdatePlant}
								form={updatingForm}
								setForm={setUpdatingForm} />
						</Form>
					)

					return (
						<>
							<div className="content to-water">
								<h3>Water Today</h3>
								{!schedule.plants.length
									? <div className="content-empty">Nothing here.</div>
									: <>
										{schedule.plants.map((plant, i) => (
											<div
												key={i}
												className="content-line with-border">
												<p className="plant">{plant.name}</p>
											</div>
										))}
										<br />
									</>
								}
							</div>
							<div className="content plants">
								<div className="content-head">
									<p className="name">Name</p>
									<p className="cycle">Cycle</p>
									<p className="last">Last Water</p>
								</div>
								{plantList.map((plant: any, i: number) => (
									<div
										key={i}
										className="content-line with-border"
										onClick={() => {
											return isRemoving
												? RemovePlant(plant)
												: isUpdating && !updatingForm.item
													? setUpdatingFormItem(plant)
													: null
										}}>
										<p className="name">{plant.name}</p>
										<p className="cycle">{plant.cycle}</p>
										<p className="last">
											{new Date(plant.last).toLocaleDateString('en-us',
												{ weekday: 'short', month: 'short', day: 'numeric' })}
										</p>
									</div>
								))}
							</div>
						</>
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

export default Plants