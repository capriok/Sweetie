import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import '../../../Styles/Sweetie/Tiles/datetime-tile.scss'

const DatetimeTile: React.FC<any> = () => {
	const [currentTime, setCurrentTime] = useState(format(new Date(), 'pp'))
	const [currentDate] = useState(`
		${format(new Date(), 'iii')}, 
		${format(new Date(), 'LLLL')}
		${format(new Date(), 'do')}
	`)

	useEffect(() => {
		setTimeout(() => {
			setCurrentTime(format(new Date(), 'pp'))
		}, 1000)
	}, [currentTime])

	return (
		<div className="datetime-tile">
			<div className="line">
				<div className="date">{currentDate}</div>
				<div className="time">{currentTime}</div>
			</div>
		</div>
	)
}

export default DatetimeTile
