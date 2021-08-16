interface CalenderEvent {
	_id?: string
	name: string
	date: string | Date
	timed: boolean
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
	lastFoodDay: string | Date | undefined
	lastWasteDay: string | Date | undefined
}

type CatScheduleDay = {
	date: string | Date
	food: {
		is: boolean
		progress: number
	}
	waste: {
		is: boolean
		progress: number
	}
}

type Plant = {
	_id?: string
	name: string
	cycle: number
	last: string
}

type PlantScheduleDay = {
	date: Date
	plants: Array<Plant>
}
