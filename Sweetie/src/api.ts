import axios from 'axios'
import { isSameDay, startOfToday } from 'date-fns'

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

	public async ServerPing(): Promise<{ status: number }> {
		const res = await AxiosInstance.get('/ping')
		return res.data.status
	}

	// CALENDER

	public async GetCalenderEvents(): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.get('/ce')
		return formatDates(res.data.list, 'date')
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

	public async GetCatSchedule(): Promise<{ today: CatScheduleDay, cs: Array<CatScheduleDay> }> {
		const res = await AxiosInstance.get('/cs')
		const today = res.data.schedule.find((d: CatScheduleDay) => isSameDay(new Date(d.date), tzZero()))
		return {
			today,
			cs: formatDates(res.data.schedule, 'date')
		}
	}

	// PLANTS

	public async GetPlantSchedule(): Promise<{ today: PlantScheduleDay, ps: Array<PlantScheduleDay> }> {
		const res = await AxiosInstance.get('/ps')
		const today = res.data.schedule.find((d: PlantScheduleDay) => isSameDay(new Date(d.date), tzZero()))
		return {
			today,
			ps: formatDates(res.data.schedule, 'last')
		}
	}

}

function tzZero() {
	const d = startOfToday()
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
	return d
}

function tzDate(date: any) {
	const d = new Date(date)
	d.setMinutes(d.getMinutes() + d.getTimezoneOffset())
	return d.toJSON()
}

const formatDates = (arr: Array<any>, prop: string) => {
	return arr.map((x: any) => {
		x[prop] = tzDate(x[prop])
		return x
	})
}

export default new Api()