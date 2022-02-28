export const swtState: SwtState = {
	calendarEvents: [],
	groceryList: [],
	catSchedule: {
		date: '',
		food: {
			is: false,
			progress: 0
		},
		waste: {
			is: false,
			progress: 0
		}
	}
}

export enum SwtReducerActions {
	SETCE = 'CalendarEvents',
	SETGL = 'GroceryList',
	SETCS = 'CatSchedule'
}

export const swtReducer = (state: SwtState, action: SwtAction): SwtState => {
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