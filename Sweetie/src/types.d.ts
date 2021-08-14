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

type CatConfig = {
	lastFoodDay: string | Date | undefined
	lastWasteDay: string | Date | undefined
}

type CatSchedule = {
	food: Array<CatScheduleDay>
	waste: Array<CatScheduleDay>
}

type CatScheduleDay = {
	date: string | Date
	is: boolean
	progress: number
}

type Plant = {
	id: string
	name: string
	cycle: number
	last: string
}

type PlantScheduleDay = {
	date: Date
	plants: Array<Plant>
}
