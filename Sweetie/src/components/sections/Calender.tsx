import { useEffect, useState } from 'react'
import { MonthlyBody, MonthlyDay, MonthlyCalendar } from '@zach.codes/react-calendar'
import { format, startOfMonth } from 'date-fns'
import Api from '../../api'

import '../../styles/sections/calender.scss'

const Calender: React.FC = () => {
	let [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()))
	const [calenderEvents, setCalenderEvents] = useState<any>([])

	const date = new Date()
	const today = date.getDate()

	useEffect(() => {
		let calenderDay = document.querySelectorAll('.rc-font-bold')
		if (calenderDay) {
			calenderDay.forEach((d) => {
				if (parseInt(d.textContent!) === today) {
					d.classList.add('today-indicator')
				}
			})
		}
	}, [])

	useEffect(() => {
		(async () => Api.GetCalenderEvents().then(ce => {
			console.log({ CalenderEvents: ce })
			setCalenderEvents(ce)
		}))()
	}, [])

	function formatEventTimes(event: CalenderEvent) {
		const { startTime, endTime } = event

		if (!event.timed || (event.timed && !startTime)) return

		const date = new Date(event.date).toJSON().split('T')[0]

		const sDate = new Date(date + 'T' + startTime)
		const start = trimTime(format(sDate, endTime ? 'h:mm' : 'p'))

		let time = start
		if (endTime) {
			const eDate = new Date(date + 'T' + endTime)
			const end = trimTime(format(eDate, 'p'))
			time = time + ' - ' + end
		}
		return time
	}

	function trimTime(time: string) {
		let slice = time.split(':')
		const hour = slice[0]
		const minute = slice[1].substring(0, 2)

		const meridian = RegExp(/AM|PM/g).test(slice[1])
			? slice[1].split(' ')[1]
			: ''

		time = hour + ':' + minute
		if (slice[1].includes('00')) {
			time = hour
		}

		return time + ' ' + meridian
	}

	return (
		<div className="calender">
			<MonthlyCalendar
				currentMonth={currentMonth}
				onCurrentMonthChange={(date: any) => setCurrentMonth(date)}>
				<MonthlyBody
					events={calenderEvents.map((ce: any) => ({
						...ce,
						date: new Date(ce.date)
					}))}>
					<MonthlyDay
						renderDay={(data) =>
							data.slice(0, 4).map((event: any, i) => (
								<p
									key={i}
									className="calender-event">
									<span className="name">{event.name}</span>
									<span className="timed">
										{event.timed
											? formatEventTimes(event)
											: ''
										}</span>
								</p>
							))
						} />
				</MonthlyBody>
			</MonthlyCalendar>
		</div>
	)
}

export default Calender

// Reference
// https://github.com/zackify/react-calendar
