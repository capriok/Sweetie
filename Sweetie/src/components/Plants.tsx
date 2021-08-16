import { isSameDay, startOfToday } from 'date-fns'
import { useEffect, useState } from 'react'
import Api from '../api';

import '../styles/plants.scss'

const Plants: React.FC = () => {
	const [today, setToday] = useState<any>({ date: '', plants: [] })

	useEffect(() => {
		(async () => Api.GetPlantSchedule().then(ps => {
			console.log({ PlantSchedule: ps })
			const today = ps.find(d => isSameDay(new Date(d.date), new Date(startOfToday())))
			setToday(today)
		}))()
	}, [])

	return (
		<div className="plants">
			<h1>Plants</h1>
			<div className="plantlist">
				{today.plants.length
					? today.plants.map((plant: any) =>
						<p className="plant">{plant.name}</p>
					)
					: <p>No plants to water.</p>
				}
			</div>
		</div>
	)
}

export default Plants