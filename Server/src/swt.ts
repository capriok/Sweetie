const fs = require('fs')
import * as SweetieStore from './store.json'

namespace SwtNameSpace {

	type CalEvent = {
		id: string
		name: string
		date: string | Date
		timed: boolean
	}

	type Grocery = {
		id: string
		name: string
		qty: number
		store: string
	}

	type StaticTask = {
		name: string
		weekday: string
	}

	type Task = {
		id: string
		name: string
		pinned: boolean
	}

	type CatOffsets = {
		food: number
		waste: number
	}

	type Plant = {
		id: string
		name: string
		cycle: number
		last: string
	}

	export class Sweetie {
		calenderEventsList: Array<CalEvent>
		groceryList: Array<Grocery>
		staticTasks: Array<StaticTask>
		taskList: Array<Task>
		catOffsets: CatOffsets
		plantList: Array<Plant>

		constructor() {
			this.calenderEventsList = SweetieStore['calenderEvents']
			this.groceryList = SweetieStore['groceryList']
			this.staticTasks = SweetieStore['staticTasks']
			this.taskList = SweetieStore['taskList']
			this.catOffsets = SweetieStore['catOffsets']
			this.plantList = SweetieStore['plantList']
		}

		getCalenderEvents() {
			return this.calenderEventsList
		}
		postCalenderEvent(event) {
			this.calenderEventsList.push(event)
			writeStorage('calenderEvents', this.calenderEventsList)
			return this.calenderEventsList
		}
		removeCalenderEvent(id) {
			this.calenderEventsList = this.calenderEventsList.filter(e => e.id !== id)
			writeStorage('calenderEvents', this.calenderEventsList)
			return this.calenderEventsList
		}

		getGroceryList() {
			return this.groceryList
		}
		postGrocery(item) {
			this.groceryList.push(item)
			writeStorage('groceryList', this.groceryList)
			return this.groceryList
		}
		removeGrocery(id) {
			this.groceryList = this.groceryList.filter(i => i.id !== id)
			writeStorage('groceryList', this.groceryList)
			return this.groceryList
		}
		clearGroceryList() {
			this.groceryList = []
			return this.groceryList
		}

		getStaticTasks() {
			return this.staticTasks
		}

		getTaskList() {
			return sortByPinned(this.taskList)
		}
		postTask(task) {
			this.taskList.unshift(task)
			writeStorage('taskList', this.taskList)
			return this.getTaskList()
		}
		removeTask(id) {
			this.taskList = this.taskList.filter(t => t.id !== id)
			writeStorage('taskList', this.taskList)
			return this.getTaskList()
		}
		clearTaskList() {
			this.taskList = []
			writeStorage('taskList', this.taskList)
			return this.getTaskList()
		}

		getCatOffsets() {
			return this.catOffsets
		}
		postCatOffsets(offsets) {
			this.catOffsets.food = offsets.food
			this.catOffsets.waste = offsets.waste
			writeStorage('catOffsets', this.catOffsets)
			return this.catOffsets
		}

		getPlantList() {
			return sortByName(this.plantList)
		}
		postPlant(plant) {
			this.plantList.push(plant)
			writeStorage('plantList', this.plantList)
			return this.getPlantList()
		}
		removePlant(id) {
			this.plantList = this.plantList.filter(p => p.id !== id)
			writeStorage('plantList', this.plantList)
			return this.getPlantList()
		}
	}

	function sortByPinned(tl: Array<Task>) {
		tl.map((t, i) => {
			if (!t.pinned) return t
			tl.splice(i, 1)
			tl.unshift(t)
		})
		return tl
	}

	function sortByName(pl: Array<Plant>) {
		return pl.sort((a, b) => a.name.localeCompare(b.name))
	}

	const isDev = process.env.NODE_ENV === 'development'
	const PATH = isDev ? 'src/store.json' : 'dist/store.json'

	function writeStorage(prop, data) {
		if (!Object.keys(SweetieStore).length) return

		let writeData = { ...SweetieStore, [prop]: data }

		fs.writeFileSync(PATH, JSON.stringify(writeData), (err) => {
			if (err) throw err
			console.log("JSON data is saved.");
		})
	}

}


export default new SwtNameSpace.Sweetie()