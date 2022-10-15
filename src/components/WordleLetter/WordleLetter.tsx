import { Text } from "@/components/ui/atoms"
import classNames from "classnames"

interface WordleLetterProps {
    letter: string
    value: string
    word: string
}

const WordleLetter = (props: WordleLetterProps) => {
    const {
        letter,
        value,
        word,
    } = props

    const getWordStatus = (): string => {
        if (!value) return 'bg-transparent'
		if (value === letter) return 'bg-success'
        if (word.includes(value)) return 'bg-warning'
        if (letter === '*') return 'bg-transparent'
        return 'bg-muted'
	}

    const wordLetterClass = classNames(
        'flex items-center justify-center h-20 w-20 border border-on-base',
        getWordStatus(),
    )
    
    return (
        <div className={wordLetterClass}>
            <Text transform="uppercase" size="h5" weight="black">{value}</Text>
        </div>
    )
}

export default WordleLetter