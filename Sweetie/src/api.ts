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

	// CALENDER

	public async GetCalenderEvents(): Promise<Array<any>> {
		const res = await AxiosInstance.get('/ce')
		return res.data.list
	}

	// GROCERIES

	public async GetGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/gl')
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

	// CATS

	public async GetCatSchedule(): Promise<Array<CatScheduleDay>> {
		const res = await AxiosInstance.get('/cs')
		return res.data.schedule
	}

	// PLANTS

	public async GetPlantList(): Promise<Array<Plant>> {
		const res = await AxiosInstance.get('/pl')
		return res.data.list
	}

}


export default new Api()