import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { addDays, startOfToday } from 'date-fns'

import Api from '../../api'
import Modal from '../Modal'
import '../../styles/sections/plants.scss'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'
import { CgMaximize, CgMinimize } from 'react-icons/cg'
import { MdSystemUpdateAlt } from 'react-icons/md'
import { startOfDay } from 'date-fns/esm'

const Plants: React.FC = () => {
	const [is, set] = useState({
		viewing: false,
		adding: false,
		removing: false,
		updating: false
	})
	const [plantList, setPlantList] = useState<Array<Plant>>([])

	const [name, setName] = useState('')
	const [cycle, setCycle] = useState(0)
	const [lastWater, setLastWater] = useState<any>(startOfToday())

	const [updatePlantItem, setUpdatePlantItem] = useState<Plant | undefined>(undefined)
	const [updateLastWater, setUpdateLastWater] = useState<any>(startOfToday())

	function ResetSetState() {
		set(() => ({ viewing: false, adding: false, removing: false, updating: false }))
	}

	function ResetAddFormState() {
		setName('')
		setCycle(0)
		setLastWater(startOfToday())
		set(is => ({ ...is, adding: false }))
	}

	function ResetUpdateFormState() {
		setUpdatePlantItem(undefined)
		setUpdateLastWater(startOfToday())
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
			<section ref={outClickRef}>
				<div className="content plants">
					<div className="head">
						<p>Water Cycle</p>
						<p>Last Water</p>
					</div>
					{plantList.slice(0, is.viewing ? plantList.length : 7).map((plant: any, i: number) => (
						<div key={i} className="plant"
							onClick={() => {
								return is.removing
									? removePlant(plant)
									: is.updating && !updatePlantItem
										? setUpdatePlantItem(plant)
										: null
							}}>
							<p className="name">{plant.name}</p>
							<div className="details">
								<p>{plant.cycle} Days</p>
								<p>
									{new Date(plant.last).toLocaleDateString('en-us',
										{ weekday: 'short', month: 'short', day: 'numeric' })}
								</p>
							</div>
						</div>
					))}
				</div>
				{plantList.length > 7 &&
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
				<Modal
					title="Add Plant"
					smref={outClickRef}
					close={() => ResetAddFormState()}>
					<form onSubmit={(e) => postPlant(e)}>
						<div className="plants">
							<div className="name-cycle">
								<input
									type="text"
									placeholder="Name"
									autoComplete="off"
									onChange={(e) => setName(e.target.value)} />
								<input
									type="number"
									min={3}
									placeholder="Cycle"
									onChange={(e) => setCycle(parseInt(e.target.value))} />
							</div>
							<div className="lastwater">
								<div><p>Last Water</p></div>
								<input
									type="date"
									max={new Date(startOfToday()).toISOString().split('T')[0]}
									onChange={(e) => setLastWater(e.target.value)} />
							</div>
							<button className="submit" type="submit">Submit</button>
						</div>
					</form>
				</Modal>
			}
			{(is.updating && updatePlantItem) &&
				<Modal
					title={`Update ${updatePlantItem.name}`}
					smref={outClickRef}
					close={() => ResetUpdateFormState()}>
					<form onSubmit={(e) => updatePlant(e)}>
						<div className="plants">
							<div className="lastwater">
								<div><p>Last Water</p></div>
								<input
									type="date"
									max={new Date(startOfToday()).toISOString().split('T')[0]}
									value={new Date(updateLastWater).toISOString().split('T')[0]}
									onChange={(e) => setUpdateLastWater(e.target.value)} />
							</div>
							<button className="submit" type="submit">Submit</button>
						</div>
					</form>
				</Modal>
			}
		</>
	)
}

export default Plants