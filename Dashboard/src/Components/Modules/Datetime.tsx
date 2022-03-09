import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import 'Styles/modules/datetime.scss'

interface Props {
	state: SwtState
}

const DatetimeModule: React.FC<Props> = () => {
	const [currentSeconds, setCurrentSeconds] = useState(getSeconds())
	const [currentTime, setCurrentTime] = useState(getTime())
	const [currentDate, setCurrentDate] = useState(getDate())

	useEffect(() => {
		setTimeout(() => {
			setCurrentSeconds(getSeconds())
			setCurrentTime(getTime())
			setCurrentDate(getDate())
		}, 1000)
	}, [currentSeconds])

	function getSeconds() {
		return format(new Date(), 'pp')
	}

	function getTime() {
		return format(new Date(), 'p')
	}

	function getDate() {
		const day = format(new Date(), 'iii')
		const month = format(new Date(), 'LLLL')
		const date = format(new Date(), 'do')

		return `${day}, ${month} ${date}`
	}

	return (
		<div className="datetime-module">
			<div className="module-cont">
				<div className="date">{currentDate}</div>
				<div className="time">{currentTime}</div>
			</div>
		</div>
	)
}

export default DatetimeModule
