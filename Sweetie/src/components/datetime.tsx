import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import '../styles/datetime.scss'

const TimeInformation: React.FC = () => {

	const [currentTime, setCurrentTime] = useState(format(new Date(), "pp"))
	const [currentDate] = useState(format(new Date(), "PPP"))


	useEffect(() => {
		setTimeout(() => {
			setCurrentTime(format(new Date(), "pp"))
		}, 1000)
	}, [currentTime])

	return (
		<div className="date-time">
			<div className="date">{currentDate}</div>
			<div className="time">{currentTime}</div>
		</div>
	)
}

export default TimeInformation