const fs = require('fs')
import { startOfToday, isSameDay, compareAsc, addDays, subDays, differenceInDays, isAfter } from 'date-fns'
import * as SweetieStore from './store.json'

namespace SwtNameSpace {

	type CalEvent = {
		id: string
		name: string
		date: string
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
		id: string
		name: string
		cycle: number
		last: string
	}
	type PlantScheduleDay = {
		date: Date
		plants: Array<Plant>
	}

	export class Sweetie {
		calenderEventsList: Array<CalEvent>
		groceryList: Array<Grocery>
		staticTasks: Array<StaticTask>
		taskList: Array<Task>
		catDays: CatDays
		catSchedule: Array<CatScheduleDay>
		plantList: Array<Plant>
		plantSchedule: Array<PlantScheduleDay>

		constructor() {
			this.calenderEventsList = SweetieStore['calenderEvents']
			this.groceryList = SweetieStore['groceryList']
			this.staticTasks = SweetieStore['staticTasks']
			this.taskList = SweetieStore['taskList']
			this.catDays = SweetieStore['catDays']
			this.catSchedule = []
			this.plantList = SweetieStore['plantList']
			this.plantSchedule = []
		}

		test() {
			console.log('Sweetie Engaged');
		}

		// CALENDER EVENTS

		getCalenderEvents() {
			if (this.calenderEventsList.some(ev => isAfter(new Date(), new Date(ev.date)))) {
				writeStorage('calenderEvents', this.calenderEventsList.filter(ev => !isAfter(new Date(), new Date(ev.date))))
				return this.getCalenderEvents()
			}

			return sortByDate(this.calenderEventsList)
		}
		postCalenderEvent(event) {
			this.calenderEventsList.push(event)
			writeStorage('calenderEvents', this.getCalenderEvents())
			return this.getCalenderEvents()
		}
		updateCalenderEvent(event) {
			this.calenderEventsList = this.calenderEventsList.filter(ev => ev.id !== event.id)
			this.calenderEventsList.push(event)
			writeStorage('calenderEvents', this.getCalenderEvents())
			return this.getCalenderEvents()
		}
		removeCalenderEvent(id) {
			this.calenderEventsList = this.calenderEventsList.filter(e => e.id !== id)
			writeStorage('calenderEvents', this.calenderEventsList)
			return this.getCalenderEvents()
		}

		// GROCERIES

		getGroceryList() {
			return this.groceryList
		}
		postGrocery(item) {
			this.groceryList.push(item)
			writeStorage('groceryList', this.groceryList)
			return this.getGroceryList()
		}
		removeGrocery(id) {
			this.groceryList = this.groceryList.filter(i => i.id !== id)
			writeStorage('groceryList', this.groceryList)
			return this.getGroceryList()
		}
		clearGroceryList() {
			this.groceryList = []
			return this.getGroceryList()
		}

		// TASKS

		getStaticTasks() {
			return this.staticTasks
		}
		getTaskList() {
			return sortByPinned(this.taskList)
		}
		postTask(task) {
			this.taskList.unshift(task)
			writeStorage('taskList', this.getTaskList())
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

			const today = this.catSchedule.find(d => isSameDay(d.date, startOfToday()))
			const lfd = new Date(this.catDays.lastFoodDay)
			const lwd = new Date(this.catDays.lastWasteDay)
			const isFoodDay = isSameDay(lfd, today.date)
			const isWasteDay = isSameDay(lwd, today.date)

			if (isFoodDay && isWasteDay) return this.catSchedule

			if ((today.food.is && !isFoodDay) || (today.waste.is && !isWasteDay)) {
				writeStorage('catDays', {
					lastFoodDay: today.food.is ? today.date : lfd,
					lastWasteDay: today.waste.is ? today.date : lwd
				})
				return this.getCatSchedule()
			}

			return this.catSchedule
		}
		postCatDays(days) {
			this.catDays.lastFoodDay = days.lastFoodDay
			this.catDays.lastWasteDay = days.lastWasteDay
			console.log(days);
			writeStorage('catDays', this.catDays)
			return this.getCatDays()
		}

		// PLANTS

		getPlantList() {
			return sortByName(this.plantList)
		}
		getPlantSchedule() {
			this.plantSchedule = createPlantSchedule(this.plantList)

			const today = this.plantSchedule.find(d => isSameDay(d.date, startOfToday()))

			if (today.plants.every(p => isSameDay(new Date(p.last), startOfToday()))) {
				return this.plantSchedule
			}

			if (today.plants.length) {
				const updatedPlantList = this.plantList.map(plant => {
					if (today.plants.some(p => p.id === plant.id)) {
						plant.last = today.date.toJSON()
					}
					return plant
				})
				writeStorage('plantList', updatedPlantList)
				return this.getPlantSchedule()
			}

			return this.plantSchedule
		}
		postPlant(plant) {
			this.plantList.push(plant)
			writeStorage('plantList', this.getPlantList())
			return this.getPlantList()
		}
		updatePlant(plant) {
			this.plantList = this.plantList.filter(p => p.id !== plant.id)
			this.plantList.push(plant)
			writeStorage('plantList', this.getPlantList())
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
	function sortByDate(arr: Array<CalEvent>) {
		return arr.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
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
	function generateWeek(s: Date) {
		let week = new Array()
		Populate(subDays(s, 3), 1)
		return week

		function Populate(s, n) {
			if (n > 7) return
			week.push(s)
			Populate(addDays(s, 1), n + 1)
		}
	}

	function createCatSchedule(cd: CatDays): Array<CatScheduleDay> {
		const { lastFoodDay, lastWasteDay } = cd
		const Food_Intv = 2
		const Waste_Intv = 4

		const lfd = new Date(lastFoodDay)
		const lwd = new Date(lastWasteDay)
		const today = startOfToday()

		const thisWeek = generateWeek(today)

		const foodDays = FindDays(lfd, Food_Intv)
		const wasteDays = FindDays(lwd, Waste_Intv)

		const schedule: any = thisWeek.map(day => {
			const foodDayMatch = foodDays.find((d) => isSameDay(d.date, day))
			const wasteDayMatch = wasteDays.find((d) => isSameDay(d.date, day))

			return {
				date: day,
				food: {
					is: foodDayMatch.is,
					progress: foodDayMatch.progress
				},
				waste: {
					is: wasteDayMatch.is,
					progress: wasteDayMatch.progress
				}
			}
		})

		console.log(schedule);
		return schedule

		function FindDays(last: Date, intv: number): Array<any> {
			const days = new Array()
			Find(subDays, last)
			Find(addDays, last)

			return [...new Map(days.map(d => [d.date, d])).values()]
				.sort((a, b) => compareAsc(a.date, b.date))

			function Find(cb, l, temp = l, n = 7) {
				if (n === 0) return

				let isDay = true
				let prog = 100
				const dif = differenceInDays(l, temp)
				const percent = Math.abs(dif) / intv * 100

				if (dif !== 0) {
					isDay = false
					dif === -Math.abs(dif)
						? prog = prog - percent
						: prog = percent
				}

				const day = {
					date: l,
					is: isDay,
					progress: Math.floor(prog)
				}

				if (isDay) temp = cb(l, intv)

				days.push(day)
				Find(cb, cb(l, 1), temp, n - 1)
			}
		}
	}
	function createPlantSchedule(pl: Array<Plant>): Array<PlantScheduleDay> {
		const today = startOfToday()
		const thisWeek = generateWeek(today)

		const schedule: any = thisWeek.map(day => {
			const plants = new Array()
			pl.forEach(plant => {
				const plantLast = new Date(plant.last)
				const plantNext = addDays(plantLast, plant.cycle)

				if (isSameDay(day, plantNext)
					|| isSameDay(plantLast, today)
					// push plant if plantNext is after today
					// || isAfter(plantNext, today)
				) plants.push(plant)
			})

			return {
				date: day,
				plants: plants
			}
		})
		// console.log(schedule);
		return schedule
	}

}

export default new SwtNameSpace.Sweetie()


