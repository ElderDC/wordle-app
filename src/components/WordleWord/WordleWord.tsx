import classNames from "classnames"
import WordleLetter from "@/components/WordleLetter"

interface WordleWordProps {
    value: string
    word: string
}

const WordleWord = (props: WordleWordProps) => {
    const {
        value,
        word,
    } = props

    const wordleWordClass = classNames('flex items-center justify-center gap-2')

    const valueArray = value.split('')
    const wordArray = word.split('')

    return (
        <div className={wordleWordClass}>
            {wordArray.map((letter, index) => (
                <WordleLetter
                    key={index}
                    letter={letter}
                    value={valueArray[index]}
                    word={word}
                />
            ))}
        </div>
    )
}

export default WordleWord