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
		const res = await AxiosInstance.get('/ws')
		return res.data.stats
	}

	// CALENDAR EVENTS 

	public async GetCalendarEvents(): Promise<Array<CalendarEvent>> {
		const res = await AxiosInstance.get('/ce')
		return res.data.list
	}

	// GROCERIES

	public async GetGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/gl')
		return res.data.list
	}

	// CATS

	public async GetCatSchedule(): Promise<CatScheduleDay> {
		const res = await AxiosInstance.get('/cs')
		return res.data.today
	}

}

export default new Api()