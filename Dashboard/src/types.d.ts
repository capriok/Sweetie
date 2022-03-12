type Socket = SocketIOClient.Socket

interface SwtState {
	calendar: Array<CalendarDay>
	groceryList: Array<Grocery>
	schedules: CatScheduleDay
}

enum SwtReducerActions {
	SETCALENDAR = 'Calendar',
	SETGROCERY = 'Grocery',
	SETSCHEDULE = 'Schedule'
}

type SwtAction =
	{ type: SwtReducerActions.SETCALENDAR, value: Array<CalendarDay> } |
	{ type: SwtReducerActions.SETGROCERY, value: Array<Grocery> } |
	{ type: SwtReducerActions.SETSCHEDULE, value: CatScheduleDay }

interface ViewAction {
	type: string
	component: any
}

interface WeatherStats {
	current: {
		loading: boolean
		temperature: string
		rain: string
		clouds: string
		max: string
		min: string
		windSpeed: string
		windGust: string
		icon: string
	}
	hours: Array<{
		time: string
		temp: string
	}>
}

interface CalendarDay {
	number: number
	events: Array<CalendarEvent>
	classNames: {
		number: string,
		day: string,
	}
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