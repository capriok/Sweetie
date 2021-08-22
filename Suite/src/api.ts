import axios from 'axios'
const ENDPOINT = process.env.REACT_APP_SERVER

const baseInstanceParams = {
	baseURL: ENDPOINT + '/swt/',
	timeout: 15000
}

const AxiosInstance = axios.create({
	...baseInstanceParams,
	headers: {
		'Content-Type': 'application/json'
	}
})

class Api {

	// CALENDER 

	public async GetCalenderEvents(): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.get('/ce')
		return res.data.list
	}

	public async PostCalenderEvent(event: CalenderEvent): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.post('/ce', { event: event })
		return res.data.list
	}

	public async UpdateCalenderEvent(event: Partial<CalenderEvent>): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.put('/ce', { event: event })
		return res.data.list
	}

	public async RemoveCalenderEvent(event: CalenderEvent): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.delete('/ce', { data: { id: event._id } })
		return res.data.list
	}

	// GROCERIES

	public async GetGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/gl')
		return res.data.list
	}

	public async PostGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl', { item: item })
		return res.data.list
	}

	public async RemoveGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.delete('/gl', { data: { id: item._id } })
		return res.data.list
	}

	public async ClearGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-clear')
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
		const res = await AxiosInstance.post('/tl', { task: task })
		return res.data.list
	}

	public async RemoveTask(task: Task): Promise<Array<Task>> {
		const res = await AxiosInstance.delete('/tl', { data: { id: task._id } })
		return res.data.list
	}

	public async ClearTaskList(): Promise<Array<Task>> {
		const res = await AxiosInstance.post('/tl-clear')
		return res.data.list
	}

	// CATS

	public async GetCatSchedule(): Promise<Array<CatScheduleDay>> {
		const res = await AxiosInstance.get('/cs')
		return res.data.schedule
	}

	public async GetCatConfig(): Promise<CatConfig> {
		const res = await AxiosInstance.get('/cc')
		return res.data.days
	}

	public async UpdateCatConfig(config: Partial<CatConfig>): Promise<CatConfig> {
		const res = await AxiosInstance.put('/cc', { config: config })
		return res.data.config
	}

	// PLANTS

	public async GetPlantSchedule(): Promise<Array<PlantScheduleDay>> {
		const res = await AxiosInstance.get('/ps')
		return res.data.schedule
	}

	public async GetPlantList(): Promise<Array<Plant>> {
		const res = await AxiosInstance.get('/pl')
		return res.data.list
	}

	public async PostPlant(plant: Plant): Promise<Array<Plant>> {
		const res = await AxiosInstance.post('/pl', { plant: plant })
		return res.data.list
	}

	public async UpdatePlant(plant: Partial<Plant>): Promise<Array<Plant>> {
		const res = await AxiosInstance.put('/pl', { plant: plant })
		return res.data.list
	}

	public async RemovePlant(plant: Plant): Promise<Array<Plant>> {
		const res = await AxiosInstance.delete('/pl', { data: { id: plant._id } })
		return res.data.list
	}

}


export default new Api()