import { useState, useEffect, useReducer } from 'react'

import Api from '../api'

enum SwtReducerActions {
	SETCE = 'CalendarEvents',
	SETGL = 'GroceryList',
	SETCS = 'CatSchedule',
	SETCC = 'CatConfig',
}

type SwtAction =
	| { type: SwtReducerActions.SETCE, value: CalendarEvent[] }
	| { type: SwtReducerActions.SETGL, value: Grocery[] }
	| { type: SwtReducerActions.SETCS, value: CatScheduleDay }
	| { type: SwtReducerActions.SETCC, value: CatConfig }

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
			{ req: Api.GetCatConfig(), dispatch: SwtReducerActions.SETCC },
		]

		Promise.all(requests.map((req: any) => req.req))
			.then((responses) => {
				responses.forEach((res, i) => {
					dispatch({ type: requests[i].dispatch, value: res })
				})
				setLoading(false)
			})
	}

	return { loading, state, dispatch }
}

const swtState: SwtState = {
	calendarEvents: [],
	groceryList: [],
	catSchedule: {
		date: '',
		food: { is: false, progress: 0 },
		waste: { is: false, progress: 0 }
	},
	catConfig: {
		lastFoodDay: '',
		lastWasteDay: ''
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

		case SwtReducerActions.SETCC:
			return { ...state, catConfig: action.value }

		default:
			return { ...swtState }
	}
}

export default useDataFetch