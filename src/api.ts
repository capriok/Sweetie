import axios from 'axios'

const ENDPOINT = process.env.REACT_APP_SERVER

const baseInstanceParams = {
	baseURL: ENDPOINT + '/swt/',
	timeout: 30000
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
		return res.data.list
	}

	public async PostCalendarEvent(event: CalendarEvent): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.post('/ce', { event: event })
		return res.data.list
	}

	public async UpdateCalendarEvent(event: Partial<CalendarEvent>): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.put('/ce', { event: event })
		return res.data.list
	}

	public async RemoveCalendarEvent(event: CalendarEvent): Promise<Array<CalendarEvent>> {
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

	public async UpdateGrocery(item: Grocery): Promise<Array<Grocery>> {
		const res = await AxiosInstance.put('/gl', { item: item })
		return res.data.list
	}

	public async RemoveCheckedGrocery(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-rem-checked')
		return res.data.list
	}

	public async RemoveAllGrocery(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.post('/gl-rem-all')
		return res.data.list
	}

	// CATS

	public async GetCatSchedule(): Promise<CatScheduleDay> {
		const res = await AxiosInstance.get('/cs')
		return res.data.today
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

export default new Api()