import { useEffect, useState } from 'react'
import Api from '../../api'

import '../../styles/sections/plants.scss'

const Plants: React.FC = () => {
	const [today, setToday] = useState<any>()

	useEffect(() => {
		(async () => Api.GetPlantSchedule().then(({ today, ps }) => {
			console.log({ PlantSchedule: ps })
			if (today) {
				setToday(today)
			}
		}))()
	}, [])

	return (
		<div className="plants">
			<h1>Plants</h1>
			<div className="plantlist">
				{!today
					? <p>Database Error</p>
					: today.plants.length
						? today.plants.map((plant: any, i: number) =>
							<p key={i} className="plant">{plant.name}</p>
						)
						: <p>No plants to water.</p>
				}
			</div>
		</div>
	)
}

export default Plants