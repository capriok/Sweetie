import axios from 'axios'
import { Grocery } from './components/grocerylist'
import { Task } from './components/tasklist'

const baseInstanceParams = {
	baseURL: 'http://localhost:9000/swt/',
	timeout: 5000
}

const AxiosInstance = axios.create({
	...baseInstanceParams,
	headers: {
		'Content-Type': 'application/json'
	}
})

class Api {

	// GROCERIES

	public async GetGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/gl')
		return res.data.list
	}

	public async RemoveGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-rem', { item: item })
		return res.data.list
	}
	public async AddGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-add', { item: item })
		return res.data.list
	}

	public async ClearGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/gl-clr')
		return res.data.list
	}

	// TASKS

	public async GetTaskList(): Promise<Array<Task>> {
		const res = await AxiosInstance.get('/tl')
		return res.data.list
	}

	public async RemoveTask(task: Task): Promise<Array<Task>> {
		const res = await AxiosInstance.post('/tl-rem', { task: task })
		return res.data.list
	}

	public async AddTask(task: Task): Promise<Array<Task>> {
		const res = await AxiosInstance.post('/tl-add', { task: task })
		return res.data.list
	}

	public async ClearTaskList(): Promise<Array<Task>> {
		const res = await AxiosInstance.get('/tl-clr')
		return res.data.list
	}
}


export default new Api()