enum SwtReducerActions {
	SETCE = 'CalendarEvents',
	SETGL = 'GroceryList',
	SETCS = 'CatSchedule',
	SETCM = 'CrimasMessage'
}

interface SwtState {
	calendarEvents: CalendarEvent[]
	groceryList: Grocery[]
	catSchedule: CatScheduleDay
	crimasMessage: string
}

type SwtAction =
	| { type: SwtReducerActions.SETCE, value: CalendarEvent[] }
	| { type: SwtReducerActions.SETGL, value: Grocery[] }
	| { type: SwtReducerActions.SETCS, value: CatScheduleDay }
	| { type: SwtReducerActions.SETCM, value: string }

interface CalendarEvent {
	_id?: string
	name: string
	timed: boolean
	date: string
	startTime: string
	endTime: string
}

interface Grocery {
	_id?: string
	name: string
	qty: number
	store: string
}

interface StaticTask {
	_id?: string
	name: string
	weekday: boolean
}

interface Task {
	_id?: string
	name: string
	pinned: boolean
}

type CatConfig = {
	_id?: string
	lastFoodDay: string
	lastWasteDay: string
}

type CatScheduleDay = {
	date: string
	food: {
		is: boolean
		progress: number
	}
	waste: {
		is: boolean
		progress: number
	}
}

type CrimasMessage = string