import { useState, useEffect, useReducer } from 'react'
import { swtReducer, SwtReducerActions, swtState } from '../state'

import Api from '../api'

const useDataFetch = (socket: Socket, serverIdle: boolean) => {
	const [loading, setLoading] = useState(true)
	const [state, dispatch] = useReducer(swtReducer, swtState)

	useEffect(() => {
		if (serverIdle) return
		setLoading(true)
		FetchData()
	}, [serverIdle])

	useEffect(() => {
		socket.on('ce-update', (ce: Array<CalendarEvent>) => {
			dispatch({ type: SwtReducerActions.SETCE, value: ce })
		})

		socket.on('gl-update', (gl: Array<Grocery>) => {
			dispatch({ type: SwtReducerActions.SETGL, value: gl })
		})

		socket.on('cs-update', (today: CatScheduleDay) => {
			dispatch({ type: SwtReducerActions.SETCS, value: today })
		})
	}, [])

	function FetchData() {
		const requests = [
			{ req: Api.GetCalendarEvents(), dispatch: SwtReducerActions.SETCE },
			{ req: Api.GetGroceryList(), dispatch: SwtReducerActions.SETGL },
			{ req: Api.GetCatSchedule(), dispatch: SwtReducerActions.SETCS }
		]
		Promise.all(requests.map((req: any) => req.req))
			.then((responses) => {
				responses.forEach((res, i) => {
					console.log({ [requests[i].dispatch]: res })
					dispatch({ type: requests[i].dispatch, value: res })
				})
			}).then(() => setLoading(false))
	}

	return { loading, state, dispatch }
}

export default useDataFetch
