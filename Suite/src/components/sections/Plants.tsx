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

const Plants: React.FC = () => {
	const [is, set] = useState({
		adding: false,
		removing: false,
		updating: false
	})
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

	function ResetSetState() {
		set(() => ({ adding: false, removing: false, updating: false }))
	}

	function ResetAddFormState() {
		setName('')
		setCycle(0)
		setLastWater(undefined)
		set(is => ({ ...is, adding: false }))
	}

	function ResetUpdateFormState() {
		setUpdatePlantItem(undefined)
		setUpdateLastWater(undefined)
		set(is => ({ ...is, updating: false }))
	}

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!is.adding && !is.removing && !is.updating) return
		if (is.updating && !updatePlantItem) return
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

	async function RemoveBtnClick() {
		set(is => ({ ...is, removing: !is.removing }))
	}

	async function removePlant(plant: Plant) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove '${plant.name}' ?`);
		if (confirmation) {
			Api.RemovePlant(plant).then(pl => setPlantList(pl))
		}
	}

	async function postPlant(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(lastWater))
		if (!name || !invalidDate) return

		const last = new Date(lastWater)
		const plant = { name, cycle, last: last.toJSON() }

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
						? <div className="content-empty"><p>Nothing here.</p></div>
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
								return is.removing
									? removePlant(plant)
									: is.updating && !updatePlantItem
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

			{(is.updating && updatePlantItem) &&
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