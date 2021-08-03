interface CalenderEvent {
	id: string
	name: string
	date: string | Date
	timed: boolean
}

interface Grocery {
	id: string
	name: string
	qty: number
	store: string
}

interface StaticTask {
	name: string
	weekday: boolean
}

interface Task {
	id: string
	name: string
	pinned: boolean
}

type CatDays = {
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

interface Plant {
	id: string
	name: string
	cycle: number
	lastWater: string
}
