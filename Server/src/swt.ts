const fs = require('fs')
import { startOfWeek, endOfWeek, startOfToday, isSameDay, compareAsc, addDays, subDays } from 'date-fns'
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

	type CatDays = {
		lastFoodDay: string
		lastWasteDay: string
	}

	type CatScheduleDay = {
		date: Date
		isFood: boolean
		isWaste: boolean
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
		catDays: CatDays
		catSchedule: Array<CatScheduleDay>
		plantList: Array<Plant>

		constructor() {
			this.calenderEventsList = SweetieStore['calenderEvents']
			this.groceryList = SweetieStore['groceryList']
			this.staticTasks = SweetieStore['staticTasks']
			this.taskList = SweetieStore['taskList']
			this.catDays = SweetieStore['catDays']
			this.catSchedule = createCatSchedule(this.catDays)
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

		getCatDays() {
			return this.catDays
		}
		getCatSchedule() {
			return this.catSchedule
		}
		postCatDays(days) {
			this.catDays.lastFoodDay = days.lastFoodDay
			this.catDays.lastWasteDay = days.lastWasteDay
			writeStorage('catDays', this.catDays)
			return this.catDays
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

	function createCatSchedule(cd: CatDays): Array<CatScheduleDay> {
		const { lastFoodDay, lastWasteDay } = cd

		const Food_Interval = 2
		const Waste_Interval = 3
		const date = new Date()
		const today = startOfToday()

		const lfd = new Date(lastFoodDay)
		const lwd = new Date(lastWasteDay)

		const foodDays = Find(lfd, Food_Interval)
		const wasteDays = Find(lwd, Waste_Interval)

		const thisWeek = GenerateWeek(startOfWeek(date))

		const schedule = thisWeek.map(day => {
			return ({
				date: day,
				isFood: foodDays.some(d => isSameDay(d, day)),
				isWaste: wasteDays.some(d => isSameDay(d, day)),
			})

		})

		console.log(schedule);

		return schedule

		function Find(last, Interval) {
			let days = []

			FindInPast(last, 3)
			days.push(last)
			FindInFuture(last, 3)

			return days.sort(compareAsc)

			function FindInPast(last, n) {
				if (n === 0) return
				let tempLast = subDays(last, Interval)
				!isSameDay(last, today) && days.unshift(last)
				FindInPast(tempLast, n - 1)
			}
			function FindInFuture(last, n) {
				if (n === 0) return
				let tempLast = addDays(last, Interval)
				!isSameDay(last, today) && days.push(last)
				FindInFuture(tempLast, n - 1)
			}
		}

		function GenerateWeek(s: Date) {
			let week = []
			for (let i = 0; i < 7; i++) {
				week.push(addDays(s, i))
			}
			return week
		}
	}

}


export default new SwtNameSpace.Sweetie()