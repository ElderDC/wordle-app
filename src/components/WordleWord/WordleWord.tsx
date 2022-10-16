import classNames from 'classnames'
import WordleLetter from '@/components/WordleLetter'
import { getWordLettersCount } from '@/utils/word.util'
import { IWordleLetterStatus } from '@/models/wordle.model'

interface WordleWordProps {
	value: string
	word: string
	example?: IWordleLetterStatus
	validated?: boolean
}

const WordleWord = (props: WordleWordProps) => {
	const { value = '', word = '', example, validated } = props

	const wordleWordClass = classNames('flex items-center justify-center gap-2')

	const valueArray = value.split('')
	const wordArray = word.split('')
	const wordLettersCount = getWordLettersCount(word)

	const letters = wordArray
		.map((letter, index) => ({
			letter,
			value: valueArray[index],
			status: IWordleLetterStatus.absent,
		}))
		.map((item) => {
			if (item.letter === item.value) {
				item.status = IWordleLetterStatus.correct
				wordLettersCount[item.value] -= 1
			}
			return item
		})
		.map((item) => {
			if (
				word.includes(item.value) &&
				wordLettersCount[item.value] > 0 &&
				item.status !== IWordleLetterStatus.correct
			) {
				item.status = IWordleLetterStatus.present
				wordLettersCount[item.value] -= 1
			}
			return item
		})

	return (
		<div className={wordleWordClass}>
			{letters.map((letter, index) => (
				<WordleLetter
					key={index}
					example={example}
					letter={letter.letter}
					value={letter.value}
					status={letter.status as IWordleLetterStatus}
					validated={validated}
				/>
			))}
		</div>
	)
}

export default WordleWord
