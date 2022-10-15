import classNames from 'classnames'
import WordleLetter from '@/components/WordleLetter'

interface WordleWordProps {
	value: string
	word: string
	example?: 'success' | 'bad-position' | 'failed'
	validated?: boolean
}

const WordleWord = (props: WordleWordProps) => {
	const {
		value = '',
		word = '',
		example,
		validated = false,
	} = props

	const wordleWordClass = classNames('flex items-center justify-center gap-2')

	const valueArray = value.split('')
	const wordArray = word.split('')

	return (
		<div className={wordleWordClass}>
			{wordArray.map((letter, index) => (
				<WordleLetter
					key={index}
					example={example}
					letter={letter}
					value={valueArray[index]}
					validated={validated}
					word={word}
				/>
			))}
		</div>
	)
}

export default WordleWord
