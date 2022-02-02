type Socket = SocketIOClient.Socket

interface SwtState {
	calendarEvents: CalendarEvent[]
	groceryList: Grocery[]
	catSchedule: CatScheduleDay
}

enum SwtReducerActions {
	SETCE = 'CalendarEvents',
	SETGL = 'GroceryList',
	SETCS = 'CatSchedule'
}

type SwtAction =
	{ type: SwtReducerActions.SETCE, value: CalendarEvent[] } |
	{ type: SwtReducerActions.SETGL, value: Grocery[] } |
	{ type: SwtReducerActions.SETCS, value: CatScheduleDay }

interface ViewAction {
	type: string
	component: any
}

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
	type: string
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