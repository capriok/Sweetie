import { useState, useEffect, useReducer } from 'react'
import { swtReducer, SwtReducerActions, swtState } from '../state'

import Api from '../api'

const useDataFetch = (socket: Socket) => {
	const [loading, setLoading] = useState(true)
	const [state, dispatch] = useReducer(swtReducer, swtState)

	useEffect(() => {
		setLoading(true)
		FetchData()
	}, [])

	useEffect(() => {
		socket.on('calendar-update', (data: Array<CalendarEvent>) => {
			console.log({ UpdatedCalendar: data })
			dispatch({ type: SwtReducerActions.SETCALENDAR, value: data })
		})

		socket.on('grocery-update', (data: Array<Grocery>) => {
			console.log({ UpdatedGrocery: data })
			dispatch({ type: SwtReducerActions.SETGROCERY, value: data })
		})

		socket.on('schedule-update', (data: ScheduleDay) => {
			console.log({ UpdatedSchedule: data })
			dispatch({ type: SwtReducerActions.SETSCHEDULE, value: data })
		})
	}, [])

	function FetchData() {
		const requests = [
			{ req: Api.GetCalendarEvents(), dispatch: SwtReducerActions.SETCALENDAR },
			{ req: Api.GetGroceryList(), dispatch: SwtReducerActions.SETGROCERY },
			{ req: Api.GetSchedules(), dispatch: SwtReducerActions.SETSCHEDULE }
		]
		Promise.all(requests.map((req: any) => req.req))
			.then((responses) => {
				responses.forEach((res, i) => {
					console.log({ [requests[i].dispatch]: res })
					dispatch({ type: requests[i].dispatch, value: res })
				})
			})
			.finally(() => setLoading(false))
	}

	return { loading, state, dispatch }
}

export default useDataFetch
