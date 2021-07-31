const fs = require('fs')
import { startOfWeek, endOfWeek, startOfToday, isSameDay, compareAsc, addDays, subDays } from 'date-fns'
import { start } from 'repl'
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
			this.catSchedule = []
			this.plantList = SweetieStore['plantList']
		}

		// CALENDER EVENTS

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

		// GROCERIES

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

		// TASKS

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

		// CATS

		getCatDays() {
			return this.catDays
		}
		getCatSchedule() {
			this.catSchedule = createCatSchedule(this.catDays)

			const today = startOfToday()
			const day = this.catSchedule.find(d => isSameDay(d.date, today))

			if (day.isFood && day.isWaste) {
				if (isSameDay(new Date(this.catDays.lastFoodDay), today) &&
					isSameDay(new Date(this.catDays.lastWasteDay), today)) return
				this.postCatDays({ lastFoodDay: today, lastWasteDay: today })
			} else if (day.isFood) {
				if (isSameDay(new Date(this.catDays.lastFoodDay), today)) return
				this.postCatDays({ ...this.catDays, lastFoodDay: today })
			} else if (day.isWaste) {
				if (isSameDay(new Date(this.catDays.lastWasteDay), today)) return
				this.postCatDays({ ...this.catDays, lastWasteDay: today })
			}
			console.log(this.catSchedule);

			return sortByDate(this.catSchedule)
		}
		postCatDays(days) {
			this.catDays.lastFoodDay = days.lastFoodDay
			this.catDays.lastWasteDay = days.lastWasteDay
			writeStorage('catDays', this.catDays)
			return this.catDays
		}

		// PLANTS

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

	function writeStorage(prop, data) {
		const isDev = process.env.NODE_ENV === 'development'
		const PATH = isDev ? 'src/store.json' : 'dist/store.json'

		if (!Object.keys(SweetieStore).length) return
		if (!SweetieStore[prop]) return

		let writeData = { ...SweetieStore, [prop]: data }

		fs.writeFileSync(PATH, JSON.stringify(writeData), (err) => {
			if (err) throw err
			console.log("JSON data is saved.");
		})
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

	function sortByDate(arr: Array<CatScheduleDay>) {
		console.log(arr.sort((a, b) => compareAsc(a.date, b.date)));

		return arr.sort((a, b) => compareAsc(a.date, b.date))
	}

	function createCatSchedule(cd: CatDays): Array<CatScheduleDay> {
		const { lastFoodDay, lastWasteDay } = cd

		const Food_Interval = 2
		const Waste_Interval = 3
		const lfd = new Date(lastFoodDay)
		const lwd = new Date(lastWasteDay)
		const today = startOfToday()

		const foodDays = FindDays(lfd, Food_Interval)
		const wasteDays = FindDays(lwd, Waste_Interval)

		const thisWeek = GenerateWeek(startOfWeek(today))
		const schedule: Array<CatScheduleDay> = thisWeek.map(day => ({
			date: day,
			isFood: foodDays.some(d => isSameDay(d, day)),
			isWaste: wasteDays.some(d => isSameDay(d, day))
		}))

		return schedule
	}

	function GenerateWeek(s: Date) {
		let week = []
		Populate(s, 1)
		return week

		function Populate(s, n) {
			if (n > 7) return
			week.push(s)
			Populate(addDays(s, 1), n + 1)
		}
	}
	function FindDays(last: Date, intv: number): Array<Date> {
		let days = []
		Find('-', last, 3)
		days.push(last)
		Find('+', last, 3)

		return [...new Map(days.map(d => [d, d])).values()].sort(compareAsc)

		function Find(d, l, n) {
			if (n === 0) return
			Find(d, nLast(d, l, intv), n - 1)
			days.push(l)
		}
		function nLast(d, l, i) {
			return d === '-'
				? subDays(l, i)
				: addDays(l, i)
		}
	}

	// console.log(new Sweetie().getCatSchedule())

}

export default new SwtNameSpace.Sweetie()
