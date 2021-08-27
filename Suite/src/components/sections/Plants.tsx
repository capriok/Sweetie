import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { isSameDay, startOfToday } from 'date-fns'

import Api from '../../api'
import Modal from '../Modal'
import PlantAdding from '../modals/Plant-Adding'
import PlantUpdating from '../modals/Plant-Updating'
import ActionBar, { ActionBarButton } from '../ActionBar'

import { VscDiffAdded, VscDiffRemoved } from 'react-icons/vsc'
import { MdSystemUpdateAlt } from 'react-icons/md'

import '../../styles/sections/plants.scss'

const Plants: React.FC<any> = ({ readOnly }) => {
	const [isAdding, setAddingState] = useState(false)
	const [isUpdating, setUpdatingState] = useState(false)
	const [isRemoving, setRemovingState] = useState(false)

	const [schedule, setSchedule] = useState<PlantScheduleDay>({
		date: '',
		plants: []
	})
	const [plantList, setPlantList] = useState<Array<Plant>>([])

	const [name, setName] = useState('')
	const [cycle, setCycle] = useState(3)
	const [lastWater, setLastWater] = useState<any>()

	const [updatePlantItem, setUpdatePlantItem] = useState<Plant | undefined>(undefined)
	const [updateLastWater, setUpdateLastWater] = useState<any>()

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
		setCycle(0)
		setLastWater(undefined)
		setAddingState(false)
	}

	function ResetUpdateFormState() {
		setUpdatePlantItem(undefined)
		setUpdateLastWater(undefined)
		setUpdatingState(false)
	}

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!isAdding && !isRemoving && !isUpdating) return
		if (isUpdating && !updatePlantItem) return
		ResetStates()
		ResetAddFormState()
		ResetUpdateFormState()
	})

	async function removePlant(plant: Plant) {
		if (!isRemoving) return

		const confirmation = window.confirm(`Remove '${plant.name}' ?`);
		if (confirmation) {
			if (readOnly) return alert('Not allowed in Read Only mode.')
			Api.RemovePlant(plant).then(pl => setPlantList(pl))
		}
	}

	async function postPlant(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(lastWater))
		if (!name || !invalidDate) return

		const last = new Date(lastWater)
		const plant = { name, cycle, last: last.toJSON() }

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(plant);
		Api.PostPlant(plant).then(pl => {
			ResetAddFormState()
			setPlantList(pl)
		})
	}

	async function updatePlant(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updateLastWater))
		if (!updateLastWater || !invalidDate) return

		const upLast = new Date(updateLastWater)

		const lastSame = isSameDay(new Date(updatePlantItem?.last!), upLast)
		if (lastSame) return

		const plant = {
			id: updatePlantItem?._id,
			last: upLast.toJSON()
		}

		if (readOnly) return alert('Not allowed in Read Only mode.')
		console.log(plant)
		Api.UpdatePlant(plant).then(pl => {
			ResetUpdateFormState()
			setPlantList(pl)
		})
	}

	useEffect(() => {
		(async () => Api.GetPlantList().then(pl => {
			console.log({ PlantList: pl })
			setPlantList(pl.map(p => {
				p.last = tzFormat(p.last)
				return p
			}))
		}))();
		(async () => Api.GetPlantSchedule().then(ps => {
			console.log({ PlantSchedule: ps })
			const T = startOfToday()
			T.setMinutes(T.getMinutes() - T.getTimezoneOffset())
			const today = ps.find(d => isSameDay(new Date(d.date), T))
			if (today) {
				today.date = tzFormat(today.date)
				setSchedule(today)
			}
		}))();
	}, [])

	function tzFormat(date: string) {
		const tzDate = new Date(date)
		tzDate.setMinutes(tzDate.getMinutes() + tzDate.getTimezoneOffset())
		return tzDate.toJSON()
	}

	return (
		<>
			<div className="section-scroll" ref={outClickRef}>
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
									? removePlant(plant)
									: isUpdating && !updatePlantItem
										? setUpdatePlantItem(plant)
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
			</div>

			<ActionBar>
				<ActionBarButton is={isAdding} click={ToggleAdding} render={<VscDiffAdded />} />
				<ActionBarButton is={isUpdating} click={ToggleUpdating} render={<MdSystemUpdateAlt />} />
				<ActionBarButton is={isRemoving} click={ToggleRemoving} render={<VscDiffRemoved />} />
			</ActionBar>

			{isAdding &&
				<Modal
					title="Add Plant"
					mref={outClickRef}>
					<PlantAdding
						submit={postPlant}
						name={name}
						setName={setName}
						cycle={cycle}
						setCycle={setCycle}
						setLastWater={setLastWater}
					/>
				</Modal>
			}

			{(isUpdating && updatePlantItem) &&
				<Modal
					title={`Update ${updatePlantItem.name}`}
					mref={outClickRef}>
					<PlantUpdating
						submit={updatePlant}
						setUpdateLastWater={setUpdateLastWater}
					/>
				</Modal>
			}
		</>
	)
}

export default Plants