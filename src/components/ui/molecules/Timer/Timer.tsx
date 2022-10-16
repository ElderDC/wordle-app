import { useState } from 'react'
import { Text } from '@/components/ui/atoms'
import { useCountDown } from '@/hooks'
import { getRemaining } from '@/utils/time.util'

interface TimerProps {
	target: number
}

const Timer = (props: TimerProps) => {
	const { target } = props

	const [time, setTime] = useState<string>(getRemaining(target))

	useCountDown(target, {
		onDown: () => setTime(getRemaining(target)),
		onEnd: () => setTime(getRemaining(target)),
	})

	return (
		<Text size='h6' weight='bold'>
			{time}
		</Text>
	)
}

export default Timer
