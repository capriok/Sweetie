import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import SlideModal from './slidemodal'
import Api from '../api'

const PlantSchedule: React.FC = () => {
	const [editing, toggleEdit] = useState(false)

	const [plantList, setPlantList] = useState<any>([])

	const [foodOffset, setFoodOffset] = useState(0)
	const [wasteOffset, setWasteOffset] = useState(0)

	const modalRef = useRef()
	useOutsideClick(modalRef, () => {
		if (!editing) return
		toggleEdit(false)
	})

	async function postSchedule(e: any) {
		e.preventyDefault()
	}

	const date = new Date()

	useEffect(() => {
		(async () => Api.GetPlantList().then(pl => setPlantList(pl)))()
	}, [])

	console.log(new Date(2021, 6, 6).toLocaleDateString());

	useEffect(() => {
		console.log(plantList)
	}, [plantList])

	return (
		<>
			<section>
				<h1>Plants</h1>
				<div className="content">

					{plantList.map((p: any, i: number) => (
						<div key={i} className="plant">
							<div>{p.name}</div>
							<div>{p.cycle}</div>
							<div>{p.last}</div>
						</div>
					))}
				</div>
				<div className="buttons">
					<button onClick={() => toggleEdit(!editing)}>Edit</button>
				</div>
			</section>
			{editing &&
				<SlideModal smref={modalRef} close={() => toggleEdit(!editing)} title="Add Task">
					<form onSubmit={(e) => postSchedule(e)}>
						<div className="plants">
							<button className="submit" type="submit">Submit</button>
						</div>
					</form>
				</SlideModal>
			}
		</>
	)
}

export default PlantSchedule