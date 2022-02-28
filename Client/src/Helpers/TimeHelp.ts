import { format } from 'date-fns'

export function FormatEventTimes(event: CalendarEvent) {
	const { startTime, endTime } = event

	if (!event.timed || (event.timed && !startTime)) return

	const date = new Date(event.date).toJSON().split('T')[0]
	const sDate = new Date(date + 'T' + startTime)
	const start = TrimTime(format(sDate, endTime ? 'h:mm' : 'p'))

	let time = start
	if (endTime) {
		const eDate = new Date(date + 'T' + endTime)
		const end = TrimTime(format(eDate, 'p'))
		time = time + '-' + end
	}

	return time
}

export function TrimTime(time: string) {
	let slice = time.split(':')
	const hour = slice[0]
	const minute = slice[1].substring(0, 2)


	let meridian = RegExp(/AM|PM/g).test(slice[1])
		? ' ' + slice[1].split(' ')[1]
		: ''

	meridian = meridian.replace('AM', 'a')
	meridian = meridian.replace('PM', 'p')

	time = hour + ':' + minute
	if (slice[1].includes('00')) {
		time = hour
	}
	return time + '' + meridian
}

export const DatesAreOnSameDay = (first: Date, second: Date) =>
	first.getFullYear() === second.getFullYear() &&
	first.getMonth() === second.getMonth() &&
	first.getDate() === second.getDate()