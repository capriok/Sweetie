import axios from 'axios'
const ENDPOINT = process.env.REACT_APP_SERVER

const baseInstanceParams = {
	baseURL: ENDPOINT + '/swt/',
	timeout: 5000
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
		const res = await AxiosInstance.post('/ce-post', { event: event })
		return res.data.list
	}

	public async UpdateCalenderEvent(event: CalenderEvent): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.post('/ce-update', { event: event })
		return res.data.list
	}

	public async RemoveCalenderEvent(event: CalenderEvent): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.post('/ce-rem', { id: event.id })
		return res.data.list
	}

	// GROCERIES

	public async GetGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/gl')
		return res.data.list
	}

	public async PostGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-post', { item: item })
		return res.data.list
	}

	public async RemoveGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-rem', { id: item.id })
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
		const res = await AxiosInstance.post('/tl-post', { task: task })
		return res.data.list
	}

	public async RemoveTask(task: Task): Promise<Array<Task>> {
		const res = await AxiosInstance.post('/tl-rem', { id: task.id })
		return res.data.list
	}

	public async ClearTaskList(): Promise<Array<Task>> {
		const res = await AxiosInstance.get('/tl-clr')
		return res.data.list
	}

	// CATS

	public async GetCatSchedule(): Promise<Array<CatScheduleDay>> {
		const res = await AxiosInstance.get('/cs')
		return res.data.schedule
	}

	public async GetCatDays(): Promise<CatDays> {
		const res = await AxiosInstance.get('/cc')
		return res.data.days
	}

	public async PostCatDays(days: CatDays): Promise<CatDays> {
		const res = await AxiosInstance.post('/cc-post', { days: days })
		return res.data.days
	}

	// PLANTS

	public async GetPlantList(): Promise<Array<Plant>> {
		const res = await AxiosInstance.get('/pl')
		return res.data.list
	}

	public async PostPlant(plant: Plant): Promise<Array<Plant>> {
		const res = await AxiosInstance.post('/pl-post', { plant: plant })
		return res.data.list
	}

	public async UpdatePlant(plant: Plant): Promise<Array<Plant>> {
		const res = await AxiosInstance.post('/pl-update', { plant: plant })
		return res.data.list
	}

	public async RemovePlant(plant: Plant): Promise<Array<Plant>> {
		const res = await AxiosInstance.post('/pl-rem', { id: plant.id })
		return res.data.list
	}

}


export default new Api()