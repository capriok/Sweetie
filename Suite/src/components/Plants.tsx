import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './slide-modal'
import Api from '../api'
import '../styles/plants.scss'

export interface Plant {
	name: string
	cycle: number
	lastWater: string
}

const Plants: React.FC = () => {
	const [is, set] = useState({
		adding: false,
		removing: false
	})
	const [plantList, setPlantList] = useState<Array<Plant>>([])

	const [name, setName] = useState('')
	const [cycle, setCycle] = useState(0)
	const [lastWater, setLastWater] = useState(new Date().toLocaleDateString())

	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!is.adding) return
		set({ adding: false, removing: false })
	})

	async function postPlant(e: any) {
		e.preventyDefault()

		const plant = {
			name, cycle, lastWater
		}

		Api.PostPlant(plant).then(pl => setPlantList(pl))
	}

	useEffect(() => {
		(async () => Api.GetPlantList().then(pl => setPlantList(pl)))()
	}, [])

	useEffect(() => {
		plantList.length && console.log({ PlantList: plantList })
	}, [plantList])

	return (
		<>
			<section>
				<h1>Plants</h1>
				<div className="content plants">
					<div className="head">
						<p>Water Cycle</p>
						<p>Last Water</p>
					</div>
					{plantList.map((plant: any, i: number) => (
						<div key={i} className="plant">
							<p className="name">{plant.name}</p>
							<div className="details">
								<p>{plant.cycle} Days</p>
								<p>{plant.last}</p>
							</div>
						</div>
					))}
				</div>
				<div className="action-btns">
					<button onClick={() => set({ ...is, adding: !is.adding })}>Add</button>
					<button onClick={() => set({ ...is, removing: !is.removing })}>Remove</button>
				</div>
			</section>
			{is.adding &&
				<SlideModal smref={modalRef} close={() => set({ ...is, adding: !is.adding })} title="Add Plant">
					<form onSubmit={(e) => postPlant(e)}>
						<div className="plants">
							<div className="name-cycle">
								<input
									type="text"
									placeholder="Name"
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
		</>
	)
}

export default Plants