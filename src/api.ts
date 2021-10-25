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

	// CALENDAR EVENTS 

	public async GetCalendarEvents(): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.get('/ce')
		return formatDates(res.data.list, 'date')
	}

	public async PostCalendarEvent(event: CalendarEvent): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.post('/ce', { event: event })
		return formatDates(res.data.list, 'date')
	}

	public async UpdateCalendarEvent(event: Partial<CalendarEvent>): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.put('/ce', { event: event })
		return formatDates(res.data.list, 'date')
	}

	public async RemoveCalendarEvent(event: CalendarEvent): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.delete('/ce', { data: { id: event._id } })
		return formatDates(res.data.list, 'date')
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

	// CATS

	public async GetCatSchedule(): Promise<{ today: CatScheduleDay, cs: Array<CatScheduleDay> }> {
		const res = await AxiosInstance.get('/cs')
		const today = res.data.schedule.find((d: CatScheduleDay) => {
			return new Date(d.date).toLocaleDateString() === tzZero(startOfToday()).toLocaleDateString()
		})
		return {
			today,
			cs: formatDates(res.data.schedule, 'date')
		}
	}

	public async GetCatConfig(): Promise<CatConfig> {
		const res = await AxiosInstance.get('/cc')
		return res.data.config
	}

	public async UpdateCatConfig(config: Partial<CatConfig>): Promise<CatConfig> {
		const res = await AxiosInstance.put('/cc', { config: config })
		return res.data.config
	}
}

export function tzZero(date: any) {
	const d = new Date(date)
	d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
	return d
}

export function tzDate(date: any) {
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