import { useEffect, useState } from 'react'
import { MonthlyBody, MonthlyDay, MonthlyCalendar } from '@zach.codes/react-calendar'
import { format, startOfMonth } from 'date-fns'
import Api from '../api'

import '../styles/calender.scss'

const Calender: React.FC = () => {
	let [currentMonth, setCurrentMonth] = useState<Date>(
		startOfMonth(new Date())
	)

	const [calenderEvents, setCalenderEvents] = useState<any>([])

	const date = new Date();
	const today = date.getDate()

	useEffect(() => {
		let calenderDay = document.querySelectorAll('.rc-font-bold')
		if (calenderDay) {
			calenderDay.forEach((d) => {
				if (parseInt(d.textContent || '') === today) {
					d.classList.add('today-indicator')
				}
			})
		}
	}, [])

	useEffect(() => {
		(async () => Api.GetCalenderEvents().then(ce => setCalenderEvents(ce)))()
	}, [])

	useEffect(() => {
		calenderEvents.length && console.log({ CalenderEvents: calenderEvents })
	}, [calenderEvents])

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
							data.map((event: any, i) => (
								<p
									key={i}
									className="calender-event">
									<span>{event.name}</span>
									<span>{event.timed ? format(event.date, 'k:mm') : ""}</span>
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
