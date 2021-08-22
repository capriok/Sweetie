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

	public async GetPlantSchedule(): Promise<Array<PlantScheduleDay>> {
		const res = await AxiosInstance.get('/ps')
		return res.data.schedule
	}

}


export default new Api()