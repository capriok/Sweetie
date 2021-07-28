interface CalenderEvent {
	id: string
	name: string
	date: Date
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

interface CatOffsets {
	food: number
	waste: number
}

interface Plant {
	id: string
	name: string
	cycle: number
	lastWater: string
}
