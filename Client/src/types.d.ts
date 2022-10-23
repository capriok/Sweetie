type Socket = SocketIOClient.Socket

interface SwtState {
	calendarEvents: Array<CalendarEvent>
	groceryList: Array<Grocery>
	schedules: CatScheduleDay
}

enum SwtReducerActions {
	SETCALENDAR = 'Calendar',
	SETGROCERY = 'Grocery',
	SETSCHEDULE = 'Schedule'
}

type SwtAction =
	{ type: SwtReducerActions.SETCALENDAR, value: Array<CalendarEvent> } |
	{ type: SwtReducerActions.SETGROCERY, value: Array<Grocery> } |
	{ type: SwtReducerActions.SETSCHEDULE, value: CatScheduleDay }

interface SubRoute {
	path: string
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
	checked: boolean
}

type ScheduleConfig = {
	_id?: string
	lastFoodDay: string
	lastWasteDay: string
}

type ScheduleDay = {
	date: string
	food: {
		is: boolean
		progress: number
	}
	waste: {
		is: boolean
		progress: number
	}
	floor: {
		is: boolean
		progress: number
	}
}