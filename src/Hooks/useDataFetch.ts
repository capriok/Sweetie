import { useState, useEffect, useReducer } from 'react'

import Api from '../api'

const useDataFetch = () => {
	const [loading, setLoading] = useState(true)
	const [state, dispatch] = useReducer(swtReducer, swtState)

	useEffect(() => {
		setLoading(true)
		FetchData()
		setInterval(() => FetchData, 600000)
	}, [])

	function FetchData() {
		Promise.all([
			Api.GetCalendarEvents(),
			Api.GetGroceryList(),
			Api.GetCatSchedule(),
			Api.GetCatConfig()
		]).then((data) => {
			console.log(data);
			setLoading(false)
			dispatch({ type: 'SetCalendarEvents', value: data[0] })
			dispatch({ type: 'SetGroceryList', value: data[1] })
			dispatch({ type: 'SetCatSchedule', value: data[2] })
			dispatch({ type: 'SetCatConfig', value: data[3] })
		})
	}

	return { loading, state, dispatch }
}

const swtState: SwtState = {
	calendarEvents: [],
	groceryList: [],
	catSchedule: {
		today: {
			date: '',
			food: { is: false, progress: 0 },
			waste: { is: false, progress: 0 }
		},
		cs: []
	},
	catConfig: {
		lastFoodDay: '',
		lastWasteDay: ''
	}
}

const swtReducer = (state: SwtState, action: SwtReducer): SwtState => {
	switch (action.type) {
		case "SetCalendarEvents":
			return { ...state, calendarEvents: action.value }

		case "SetGroceryList":
			return { ...state, groceryList: action.value }

		case "SetCatSchedule":
			return { ...state, catSchedule: action.value }

		case "SetCatConfig":
			return { ...state, catConfig: action.value }

		default:
			return { ...swtState }
	}
}

export default useDataFetch