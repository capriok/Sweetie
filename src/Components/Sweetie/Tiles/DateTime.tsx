import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import useHoliday from '../../../Hooks/useHoliday'

import '../../../Styles/Sweetie/Tiles/datetime.scss'

const DateTime: React.FC = () => {
	const [currentTime, setCurrentTime] = useState(format(new Date(), 'pp'))
	const [currentDate] = useState(`
		${format(new Date(), 'iii')}, 
		${format(new Date(), 'LLLL')}
		${format(new Date(), 'do')}
	`)

	const holiday = useHoliday()

	useEffect(() => {
		!holiday.loading && console.log({ Holiday: holiday })
	}, [holiday])

	useEffect(() => {
		setTimeout(() => {
			setCurrentTime(format(new Date(), 'pp'))
		}, 1000)
	}, [currentTime])

	return (
		<div className="date-time">
			<div className="line">
				<div className="date">{currentDate}</div>
				<div className="time">{currentTime}</div>
			</div>
			{holiday.loading &&
				<div className="holiday sub-title">
					{holiday.name && <>
						<label>Happy </label>
						<span className="name">{holiday.name}!</span>
					</>}
				</div>
			}
		</div>
	)
}

export default DateTime
