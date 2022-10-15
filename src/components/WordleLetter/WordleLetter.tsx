import { Text } from '@/components/ui/atoms'
import classNames from 'classnames'

interface WordleLetterProps {
	letter: string
	value: string
	word: string
	example?: boolean
}

const WordleLetter = (props: WordleLetterProps) => {
	const { letter, value, word, example = false } = props

	const getWordStatus = (): string => {
		if (!value) return 'bg-on-base/10'
		if (value === letter) return 'bg-success'
		if (word.includes(value)) return 'bg-warning'
		if (letter === '*') return 'bg-transparent'
		return 'bg-muted'
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
