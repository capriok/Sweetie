import { useEffect, useState } from 'react'
import { MonthlyBody, MonthlyDay, MonthlyCalendar } from '@zach.codes/react-calendar';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';
import { format, startOfMonth } from 'date-fns';

import '../styles/calender.scss'

const Calender: React.FC = () => {
	let [currentMonth, setCurrentMonth] = useState<Date>(
		startOfMonth(new Date())
	)

	const date = new Date();
	const today = date.getDate()

	useEffect(() => {
		let calDay = document.querySelectorAll('.rc-font-bold')
		if (calDay) {
			calDay.forEach((d) => {
				if (parseInt(d.textContent || '') === today) {
					d.classList.add('today-indicator')
				}
			})
		}
	}, [])

	return (
		<div className="calender">
			<MonthlyCalendar
				currentMonth={currentMonth}
				onCurrentMonthChange={(date: any) => setCurrentMonth(date)}>
				<MonthlyBody
					events={[
						{ title: 'Anniversary', date: new Date(2021, 6, 5), timed: false },
						{ title: 'My Birthday', date: new Date(2021, 6, 11), timed: false },
						{ title: 'Chiro', date: new Date(2021, 6, 16, 9, 0, 0), timed: true },
						{ title: 'Massage', date: new Date(2021, 6, 16, 9, 0, 0), timed: true },
						{ title: 'Hair', date: new Date(2021, 6, 16, 9, 0, 0), timed: true },
						{ title: 'Vegaboitri', date: new Date(2021, 6, 30), timed: false },
						{ title: 'Vegaboitri', date: new Date(2021, 6, 31), timed: false },
					]}>
					<MonthlyDay
						renderDay={(data) =>
							data.map((item: any, i) => (
								<p
									key={i}
									className="calender-event">
									<span>{item.title}</span>
									<span>{item.timed ? format(item.date, 'k:mm') : ""}</span>
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