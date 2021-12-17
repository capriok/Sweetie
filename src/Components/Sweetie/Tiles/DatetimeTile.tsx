import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import '../../../Styles/Sweetie/Tiles/datetime-tile.scss'

interface Props {
	socket: Socket
	state: SwtState
	dispatch: React.Dispatch<SwtAction>
}

const DatetimeTile: React.FC<Props> = () => {
	const day = format(new Date(), 'iii')
	const month = format(new Date(), 'LLLL')
	const date = format(new Date(), 'do')

	const [currentTime, setCurrentTime] = useState(format(new Date(), 'pp'))
	const [currentDate] = useState(`${day}, ${month} ${date}`)

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
