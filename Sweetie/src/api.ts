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

const tzZero = () => {
	const T = startOfToday()
	T.setMinutes(T.getMinutes() - T.getTimezoneOffset())
	return T
}

export function tzDate(date: any) {
	const tzDate = new Date(date)
	tzDate.setMinutes(tzDate.getMinutes() + tzDate.getTimezoneOffset())
	return tzDate.toJSON()
}

const formatCalenderEventsDates = (ce: Array<CalenderEvent>) => {
	return ce.map((d: CalenderEvent) => {
		if (!d.timed) d.date = tzDate(d.date)
		return d
	})
}

const formatCatScheduleDates = (cs: Array<CatScheduleDay>) => {
	return cs.map((d: CatScheduleDay) => {
		d.date = tzDate(d.date)
		return d
	})
}

const formatPlantScheduleDates = (ps: Array<PlantScheduleDay>) => {
	return ps.map((d: PlantScheduleDay) => {
		d.date = tzDate(d.date)
		return d
	})
}

class Api {

	public async ServerPing(): Promise<{ status: number }> {
		const res = await AxiosInstance.get('/ping')
		return res.data.status
	}

	// CALENDER

	public async GetCalenderEvents(): Promise<Array<CalenderEvent>> {
		const res = await AxiosInstance.get('/ce')
		return formatCalenderEventsDates(res.data.list)
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
			cs: formatCatScheduleDates(res.data.schedule)
		}
	}

	// PLANTS

	public async GetPlantSchedule(): Promise<{ today: PlantScheduleDay, ps: Array<PlantScheduleDay> }> {
		const res = await AxiosInstance.get('/ps')
		const today = res.data.schedule.find((d: PlantScheduleDay) => isSameDay(new Date(d.date), tzZero()))
		return {
			today,
			ps: formatPlantScheduleDates(res.data.schedule)
		}
	}

}

export default new Api()