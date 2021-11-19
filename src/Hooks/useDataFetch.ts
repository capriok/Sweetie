import { useState, useEffect, useReducer } from 'react'

import Api from '../api'

enum SwtReducerActions {
	SETCE = 'CalendarEvents',
	SETGL = 'GroceryList',
	SETCS = 'CatSchedule'
}

type SwtAction =
	| { type: SwtReducerActions.SETCE, value: CalendarEvent[] }
	| { type: SwtReducerActions.SETGL, value: Grocery[] }
	| { type: SwtReducerActions.SETCS, value: CatScheduleDay }

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
			{ req: Api.GetCatSchedule(), dispatch: SwtReducerActions.SETCS },
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

const swtState: SwtState = {
	calendarEvents: [],
	groceryList: [],
	catSchedule: {
		date: '',
		food: { is: false, progress: 0 },
		waste: { is: false, progress: 0 }
	}
}

const swtReducer = (state: SwtState, action: SwtAction): SwtState => {
	switch (action.type) {
		case SwtReducerActions.SETCE:
			return { ...state, calendarEvents: action.value }

		case SwtReducerActions.SETGL:
			return { ...state, groceryList: action.value }

		case SwtReducerActions.SETCS:
			return { ...state, catSchedule: action.value }

		default:
			console.error('Invalid Dispatch Type')
			return { ...swtState }
	}
}
