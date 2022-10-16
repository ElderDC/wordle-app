import { IntervalOption } from '@/models/time.model'

export const addTime = (
	number: number,
	interval: IntervalOption,
	date: Date = new Date()
) => {
	if (interval === IntervalOption.HOURS) date.setHours(date.getHours() + number)
	if (interval === IntervalOption.MINUTES)
		date.setMinutes(date.getMinutes() + number)
	if (interval === IntervalOption.SECONDS)
		date.setSeconds(date.getSeconds() + number)
	if (interval === IntervalOption.MILLISECONDS)
		date.setMilliseconds(date.getMilliseconds() + number)
	return date
}

export const addZeroToLeft = (number: number): string => {
	return number.toString().padStart(2, '0')
}
