import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './SlideModal'
import Api from '../api'
import '../styles/plants.scss'
import short from 'short-uuid'

const Plants: React.FC = () => {
	const [is, set] = useState({
		viewing: false,
		adding: false,
		removing: false
	})
	const [plantList, setPlantList] = useState<Array<Plant>>([])

	const [name, setName] = useState('')
	const [cycle, setCycle] = useState(0)
	const [lastWater, setLastWater] = useState(new Date().toLocaleDateString())

	const outClickRef: any = useRef()
	useOutsideClick(outClickRef, () => {
		if (!is.adding && !is.removing) return
		set({ viewing: false, adding: false, removing: false })
	})

	function AddBtnClick() {
		set({ ...is, adding: !is.adding })
	}

	async function RemoveBtnClick() {
		set({ ...is, removing: !is.removing })
	}

	async function removePlant(plant: Plant) {
		if (!is.removing) return

		const confirmation = window.confirm(`Remove "${plant.name}" ?`);
		if (confirmation) {
			Api.RemovePlant(plant).then(pl => setPlantList(pl))
		}
	}

	async function postPlant(e: any) {
		e.preventDefault()

		console.log(lastWater);

		const plant = { id: short.generate(), name, cycle, lastWater }

		Api.PostPlant(plant).then(pl => setPlantList(pl))
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
					{plantList.slice(0, is.viewing ? plantList.length : 5).map((plant: any, i: number) => (
						<div key={i} className="plant"
							onClick={() => removePlant(plant)}>
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
				<div className="action-btns">
					<button onClick={AddBtnClick} disabled={is.removing}>Add</button>
					<button onClick={() => set({ ...is, viewing: !is.viewing })}>
						{is.viewing ? 'Minimize' : 'View All Plants'}
					</button>
					<button onClick={RemoveBtnClick}>{is.removing ? 'Done' : 'Remove'}</button>
				</div>
			</section>
			{is.adding &&
				<SlideModal smref={outClickRef} close={() => set({ ...is, adding: !is.adding })} title="Add Plant">
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