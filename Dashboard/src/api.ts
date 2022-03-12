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

	public async GetWeatherStats(): Promise<WeatherStats> {
		const res = await AxiosInstance.get('/weather')
		return res.data.stats
	}

	// CALENDAR

	public async GetCalendarWithEvents(): Promise<Array<CalendarDay>> {
		const res = await AxiosInstance.get('/calendar')
		return res.data.calendar
	}

	// GROCERY

	public async GetGroceryList(): Promise<Array<Grocery>> {
		const res = await AxiosInstance.get('/grocery')
		return res.data.list
	}

	// SCHEDULE

	public async GetCatSchedule(): Promise<ScheduleDay> {
		const res = await AxiosInstance.get('/schedule')
		return res.data.schedules
	}

}

export default new Api()