import axios from 'axios'

const ENDPOINT = process.env.REACT_APP_SERVER

const baseInstanceParams = {
	baseURL: ENDPOINT + '/swt/',
	timeout: 10000
}

const AxiosInstance = axios.create({
	...baseInstanceParams,
	headers: {
		'Content-Type': 'application/json'
	}
})

class Api {

	// PING

	public async ServerPing(): Promise<{ status: number }> {
		const res = await AxiosInstance.get('/ping', { timeout: 60000 })
		return res.data
	}

	// WEATHER

	public async GetWeatherStats(): Promise<any> {
		const res = await AxiosInstance.get('/weather')
		return res.data.stats
	}

	// CALENDAR

	public async GetCalendarEvents(): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.get('/calendar')
		return res.data.list
	}

	public async PostCalendarEvent(event: CalendarEvent): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.post('/calendar', { event: event })
		return res.data.list
	}

	public async UpdateCalendarEvent(event: Partial<CalendarEvent>): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.put('/calendar', { event: event })
		return res.data.list
	}

	public async RemoveCalendarEvent(event: CalendarEvent): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.delete('/calendar', { data: { id: event._id } })
		return res.data.list
	}

	// GROCERY

	public async GetGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/grocery')
		return res.data.list
	}

	public async PostGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/grocery', { item: item })
		return res.data.list
	}

	public async UpdateGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.put('/grocery', { item: item })
		return res.data.list
	}

	public async RemoveCheckedGrocery(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/grocery-rem-checked')
		return res.data.list
	}

	public async RemoveAllGrocery(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/grocery-rem-all')
		return res.data.list
	}

	// SCHEDULE

	public async GetSchedules(): Promise<ScheduleDay> {
		const res = await AxiosInstance.get('/schedule')
		return res.data.schedules
	}

	public async GetSchedulesConfig(): Promise<ScheduleConfig> {
		const res = await AxiosInstance.get('/schedule-config')
		return res.data.config
	}

	public async UpdateSchedulesConfig(config: ScheduleConfig): Promise<ScheduleConfig> {
		const res = await AxiosInstance.put('/schedule-config', { config: config })
		return res.data.config
	}
}

export default new Api()