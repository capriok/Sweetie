import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { addDays } from 'date-fns'
import short from 'short-uuid'

import Api from '../api'
import SlideModal from './SlideModal'
import '../styles/plants.scss'

import { VscDiffAdded, VscDiffRemoved, VscDebugStop } from 'react-icons/vsc'
import { CgMaximize, CgMinimize } from 'react-icons/cg'
import { MdSystemUpdateAlt } from 'react-icons/md'

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
	const [lastWater, setLastWater] = useState('')

	const [updatePlantItem, setUpdatePlantItem] = useState<Plant | undefined>(undefined)
	const [updateLastWater, setUpdateLastWater] = useState('')

	function ResetSetState() {
		set({ viewing: false, adding: false, removing: false, updating: false })
	}

	function ResetAddFormState() {
		setName('')
		setCycle(0)
		setLastWater('')
		set({ ...is, adding: false })
	}

	function ResetUpdateFormState() {
		setUpdatePlantItem(undefined)
		setUpdateLastWater('')
		set({ ...is, updating: false })
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
		set({ ...is, adding: !is.adding })
	}

	async function UpdateBtnClick() {
		set({ ...is, updating: !is.updating })
	}

	async function RemoveBtnClick() {
		set({ ...is, removing: !is.removing })
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

		// const last = addDays(startOfDay(new Date(lastWater)), 1).toJSON()
		const last = addDays(new Date(lastWater), 1).toJSON()
		console.log(last);

		const plant = { id: short.generate(), name, cycle, last: last }

		Api.PostPlant(plant).then(pl => setPlantList(pl))
	}

	async function updatePlant(e: any) {
		e.preventDefault()

		const invalidDate = !isNaN(Date.parse(updateLastWater))
		if (!updateLastWater || !invalidDate) return

		// const last = addDays(startOfDay(new Date(lastWater)), 1).toJSON()
		const last = addDays(new Date(updateLastWater), 1).toJSON()
		const plant = {
			id: updatePlantItem!.id,
			name: updatePlantItem!.name,
			cycle: updatePlantItem!.cycle,
			last: last
		}
		console.log(updatePlantItem);
		console.log(plant);

		Api.UpdatePlant(plant).then(pl => setPlantList(pl))
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
				<h1>Plants</h1>
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
				<SlideModal
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
								<input type="date"
									onChange={(e) => setLastWater(e.target.value)} />
							</div>
							<button className="submit" type="submit">Submit</button>
						</div>
					</form>
				</SlideModal>
			}
			{(is.updating && updatePlantItem) &&
				<SlideModal
					title={`Update ${updatePlantItem.name}`}
					smref={outClickRef}
					close={() => ResetUpdateFormState()}>
					<form onSubmit={(e) => updatePlant(e)}>
						<div className="plants">
							<div className="lastwater">
								<div><p>Last Water</p></div>
								<input type="date"
									onChange={(e) => setUpdateLastWater(e.target.value)} />
							</div>
							<button className="submit" type="submit">Submit</button>
						</div>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default Plants