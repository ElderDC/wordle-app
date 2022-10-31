import { useEffect, useState } from 'react'
import { useKeyPress } from '@/hooks'
import { Button, Icon } from '@/components/ui/atoms'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { getWordLettersCount } from '@/utils/word.util'
import { IWordleLetterStatus, statusColorOptions } from '@/models/wordle.model'

const noop = () => {}

interface WordleKeyboardProps {
	disabled: boolean
	onKey: (_key: string) => void
	onEnter: () => void
	onBackspace: () => void
}

const WordleKeyboard = (props: WordleKeyboardProps) => {
	const {
		disabled = false,
		onKey = noop,
		onEnter = noop,
		onBackspace = noop,
	} = props

	const [letters, setLetters] = useState<Record<string, IWordleLetterStatus>>(
		{}
	)
	const { word, tries } = useSelector((state: RootState) => state.wordle)
	const keyPressed = useKeyPress()

	useEffect(() => {
		if (!disabled) handleKeyPress(keyPressed)
	}, [keyPressed])

	useEffect(() => {
		calculateLetterStatus(tries)
	}, [tries])

	const handleKeyPress = (key: string) => {
		if (!key) return

		const keyPress = keys.flat().find((item) => item.key === key)

		if (!keyPress) return
		if (key === 'Enter') return onEnter()
		if (key === 'Backspace') return onBackspace()
		return onKey(key)
	}

	const calculateLetterStatus = (data: string[]) => {
		const wordArray = word.split('')
		const wordLettersCount = getWordLettersCount(word)
		const letterStatus: Record<string, IWordleLetterStatus> = {}

		data.forEach((tried: string) => {
			const triedArray = tried.split('')
			triedArray.forEach((letter) => {
				if (!letterStatus[letter]) {
					letterStatus[letter] = IWordleLetterStatus.absent
				}
			})
			triedArray.forEach((letter, index) => {
				if (letter === wordArray[index]) {
					letterStatus[letter] = IWordleLetterStatus.correct
					wordLettersCount[letter] -= 1
				}
			})
			triedArray.forEach((letter) => {
				if (word.includes(letter) && wordLettersCount[letter] > 0) {
					letterStatus[letter] = IWordleLetterStatus.present
					wordLettersCount[letter] -= 1
				}
			})
		})

		setLetters(letterStatus)
	}

	const getLetterStatus = (letter: string): string => {
		const current = letters[letter]
		if (!current) return 'bg-base-300 text-on-base'
		return statusColorOptions[current]
	}

	const keys = [
		[
			{ key: 'q', children: 'q' },
			{ key: 'w', children: 'w' },
			{ key: 'e', children: 'e' },
			{ key: 'r', children: 'r' },
			{ key: 't', children: 't' },
			{ key: 'y', children: 'y' },
			{ key: 'u', children: 'u' },
			{ key: 'i', children: 'i' },
			{ key: 'o', children: 'o' },
			{ key: 'p', children: 'p' },
		],
		[
			{ key: 'a', children: 'a' },
			{ key: 's', children: 's' },
			{ key: 'd', children: 'd' },
			{ key: 'f', children: 'f' },
			{ key: 'g', children: 'g' },
			{ key: 'h', children: 'h' },
			{ key: 'j', children: 'j' },
			{ key: 'k', children: 'k' },
			{ key: 'l', children: 'l' },
		],
		[
			{ key: 'Enter', children: 'Enter' },
			{ key: 'z', children: 'z' },
			{ key: 'x', children: 'x' },
			{ key: 'c', children: 'c' },
			{ key: 'v', children: 'v' },
			{ key: 'b', children: 'b' },
			{ key: 'n', children: 'n' },
			{ key: 'm', children: 'm' },
			{ key: 'Backspace', children: <Icon>backspace</Icon> },
		],
	]

	return (
		<div className='flex flex-col gap-2'>
			{keys.map((row, rowIndex) => (
				<div key={`row-${rowIndex}`} className='flex justify-center gap-2'>
					{row.map((item, keyIndex) => (
						<Button
							key={`key-${keyIndex}`}
							disabled={disabled}
							size="sm"
							className={getLetterStatus(item.key)}
							onClick={() => handleKeyPress(item.key)}
						>
							{item.children}
						</Button>
					))}
				</div>
			))}
		</div>
	)
}

export default WordleKeyboard
