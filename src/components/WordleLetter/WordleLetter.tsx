import classNames from 'classnames'
import { Text } from '@/components/ui/atoms'
import { IWordleLetterStatus, statusColorOptions } from '@/models/wordle.model'

interface WordleLetterProps {
	letter: string
	value: string
	example?: IWordleLetterStatus
	status?: IWordleLetterStatus
	validated?: boolean
}

const WordleLetter = (props: WordleLetterProps) => {
	const {
		letter,
		value,
		example,
		status,
		validated = false,
	} = props

	const getWordStatus = (): string => {
		if (letter === '*') return 'bg-transparent'
		if (example) return statusColorOptions[example]
		if (!validated) return 'bg-on-base/10'
		if (status) return `${statusColorOptions[status]} text-white`
		return 'bg-on-base/10'
	}

	const wordLetterClass = classNames(
		'flex items-center justify-center h-20 w-20 rounded',
		getWordStatus(),
		{
			'border border-on-base': example,
		}
	)

	return (
		<div className={wordLetterClass}>
			<Text transform='uppercase' size='h5' weight='black'>
				{value}
			</Text>
		</div>
	)
}

export default WordleLetter
