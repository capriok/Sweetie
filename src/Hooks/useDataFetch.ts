import { useState, useEffect, useReducer } from 'react'
import { swtReducer, swtState } from '../state'

import Api from '../api'

enum SwtReducerActions {
	SETCE = 'CalendarEvents',
	SETGL = 'GroceryList',
	SETCS = 'CatSchedule'
}

const useDataFetch = () => {
	const [loading, setLoading] = useState(true)
	const [state, dispatch] = useReducer(swtReducer, swtState)

	useEffect(() => {
		setLoading(true)
		FetchData()
		setInterval(FetchData, 600000)
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
