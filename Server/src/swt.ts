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

	export class Sweetie {

		groceryList: Array<Grocery>
		taskList: Array<Task>

		constructor() {
			this.groceryList = SweetieStore['groceryList']
			this.taskList = SweetieStore['taskList']
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
	}
}


export default new SwtNameSpace.Sweetie()