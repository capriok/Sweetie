interface Grocery {
	name: string
	qty: number
	store: string
}

interface StaticTask {
	name: string
	weekday: boolean
}

interface Task {
	name: string
	pinned: boolean
}

interface CatOffsets {
	food: number
	waste: number
}

interface Plant {
	name: string
	cycle: number
	lastWater: string
}
