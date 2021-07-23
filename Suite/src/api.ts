import axios from 'axios'

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

	public async PostGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-add', { item: item })
		return res.data.list
	}

	public async RemoveGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-rem', { item: item })
		return res.data.list
	}

	public async ClearGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/gl-clr')
		return res.data.list
	}

	// STATIC TASKS 

	public async GetStaticTasks(): Promise<Array<StaticTask>> {
		const res = await AxiosInstance.get('/st')
		return res.data.list
	}

	// TASKS

	public async GetTaskList(): Promise<Array<Task>> {
		const res = await AxiosInstance.get('/tl')
		return res.data.list
	}

	public async PostTask(task: Task): Promise<Array<Task>> {
		const res = await AxiosInstance.post('/tl-add', { task: task })
		return res.data.list
	}

	public async RemoveTask(task: Task): Promise<Array<Task>> {
		const res = await AxiosInstance.post('/tl-rem', { task: task })
		return res.data.list
	}

	public async ClearTaskList(): Promise<Array<Task>> {
		const res = await AxiosInstance.get('/tl-clr')
		return res.data.list
	}

	// CATS

	public async GetCatOffsets(): Promise<CatOffsets> {
		const res = await AxiosInstance.get('/co')
		return res.data.offsets
	}

	public async PostOffsets(offsets: CatOffsets): Promise<CatOffsets> {
		const res = await AxiosInstance.post('/co-edit', { offsets: offsets })
		return res.data.offsets
	}

	// PLANTS

	public async GetPlantList(): Promise<Array<Plant>> {
		const res = await AxiosInstance.get('/pl')
		return res.data.list
	}

	public async RemovePlant(plant: Plant): Promise<Array<Plant>> {
		const res = await AxiosInstance.post('/pl-rem', { plant: plant })
		return res.data.list
	}

	public async PostPlant(plant: Plant): Promise<Array<Plant>> {
		const res = await AxiosInstance.post('/pl-add', { plant: plant })
		return res.data.list
	}

}


export default new Api()