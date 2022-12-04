export const swtState: SwtState = {
	calendarEvents: [],
	groceryList: [],
	schedules: {
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
	SETCALENDAR = 'Calendar',
	SETGROCERY = 'Grocery',
	SETSCHEDULE = 'Schedule'
}

export const swtReducer = (state: SwtState, action: SwtAction): SwtState => {
	switch (action.type) {
		case SwtReducerActions.SETCALENDAR:
			return { ...state, calendarEvents: action.value }

		case SwtReducerActions.SETGROCERY:
			return { ...state, groceryList: action.value }

		case SwtReducerActions.SETSCHEDULE:
			return { ...state, schedules: action.value }

		default:
			console.error('Invalid Dispatch Type')
			return { ...swtState }
	}
}