import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { addDays, startOfDay } from 'date-fns'

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
	const [plantList, setPlantList] = useState<Array<Plant>>([])

	const [name, setName] = useState('')
	const [cycle, setCycle] = useState(0)
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

		const last = addDays(startOfDay(new Date(lastWater)), 1).toJSON()

		const plant = { name, cycle, last }

		Api.PostPlant(plant).then(pl => {
			ResetAddFormState()
			setPlantList(pl)
		})
	}

	async function updatePlant(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updateLastWater))
		if (!updateLastWater || !invalidDate) return

		const upLast = addDays(startOfDay(new Date(updateLastWater)), 1).toJSON()
		const plant = {
			id: updatePlantItem?._id,
			last: upLast
		}

		console.log(plant)

		Api.UpdatePlant(plant).then(pl => {
			ResetUpdateFormState()
			setPlantList(pl)
		})
	}

	useEffect(() => {
		(async () => Api.GetPlantList().then(pl => {
			console.log({ PlantList: plantList })
			setPlantList(pl)
		}))()
	}, [])

	return (
		<>
			<div className="section-scroll" ref={outClickRef}>
				<div className="content plants">
					<div className="content-head">
						<p>Name</p>
						<p>Cycle / Last Waster</p>
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
							<p className="lastwater">
								{new Date(plant.last).toLocaleDateString('en-us',
									{ weekday: 'short', month: 'short', day: 'numeric' })}
							</p>
						</div>
					))}
				</div>
			</div>

			<ActionBar actives={[
				[is.adding, AddBtnClick],
				[is.updating, UpdateBtnClick],
				[is.removing, RemoveBtnClick]
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
						setName={setName}
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
						updateLastWater={updateLastWater}
						setUpdateLastWater={setUpdateLastWater}
					/>
				</Modal>
			}
		</>
	)
}

export default Plants