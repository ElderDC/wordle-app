import {
	IntervalOption,
	MILLISECONDS_OF_A_DAY,
	MILLISECONDS_OF_A_HOUR,
	MILLISECONDS_OF_A_MINUTE,
	MILLISECONDS_OF_A_SECOND,
} from '@/models/time.model'

export const getRemaining = (timer: number) => {
	if (timer === 0) return '00:00:00'
	const duration = timer - Date.now()
	const remainingHours = Math.floor(
		(duration % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR
	)
	const remainingMinutes = Math.floor(
		(duration % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE
	)
	const remainingSeconds = Math.floor(
		(duration % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND
	)

	return `${addZeroToLeft(remainingHours)}:${addZeroToLeft(
		remainingMinutes
	)}:${addZeroToLeft(remainingSeconds)}`
}

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
