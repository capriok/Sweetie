import * as SweetieStore from './store.json'

namespace SwtNameSpace {

	type Grocery = {
		name: string
		qty: number
		store: string
	}

	type Task = {
		name: string
		pinned: boolean
	}

	type Plant = {
		name: string
		cycle: number
		last: string
	}

	export class Sweetie {

		groceryList: Array<Grocery>
		taskList: Array<Task>
		plantList: Array<Plant>

		constructor() {
			this.groceryList = SweetieStore['groceryList']
			this.taskList = SweetieStore['taskList']
			this.plantList = SweetieStore['plantList']
		}

		getGroceryList() {
			return this.groceryList
		}
		addGrocery(item) {
			this.groceryList.push(item)
			return this.groceryList
		}
		removeGrocery(item) {
			this.groceryList = this.groceryList.filter(i => i.name !== item.name)
			return this.groceryList
		}
		clearGroceryList() {
			this.groceryList = []
			return this.groceryList
		}

		getTaskList() {
			return this.taskList
		}
		addTask(task) {
			this.taskList.push(task)
			return this.taskList
		}
		removeTask(task) {
			this.taskList = this.taskList.filter(t => t.name !== task.name)
			return this.taskList
		}
		clearTaskList() {
			this.taskList = []
			return this.taskList
		}

		getPlantList() {
			return this.plantList
		}
		addPlant(plant) {
			this.plantList.push(plant)
			return this.plantList
		}
		removePlant(plant) {
			this.plantList = this.plantList.filter(p => p.name !== plant.name)
			return this.plantList
		}
	}
}


export default new SwtNameSpace.Sweetie()