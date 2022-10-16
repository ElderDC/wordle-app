import { useEffect } from 'react'
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

	const { word, tries } = useSelector((state: RootState) => state.wordle)

	const keyPressed = useKeyPress()

	useEffect(() => {
		if (!disabled) handleKeyPress(keyPressed)
	}, [keyPressed])

	const handleKeyPress = (key?: string) => {
		if (!key) return
		const keyPress = [...keysRow1, ...keysRow2, ...keysRow3].find(
			(item) => item.key === key
		)
		if (keyPress) keyPress.onClick()
	}

	const wordLettersCount = getWordLettersCount(word)
	const wordArray = word.split('')
	const letters: Record<string, IWordleLetterStatus> = {}

	tries.forEach((tried) => {
		const triedArray = tried.split('')
		triedArray.forEach((letter) => {
			if (!letters[letter]) letters[letter] = IWordleLetterStatus.absent
		})
		triedArray.forEach((letter, index) => {
			if (letter === wordArray[index]) {
				letters[letter] = IWordleLetterStatus.correct
				wordLettersCount[letter] -= 1
			}
		})
		triedArray.forEach((letter) => {
			if (word.includes(letter) && wordLettersCount[letter] > 0) {
				letters[letter] = IWordleLetterStatus.present
				wordLettersCount[letter] -= 1
			}
		})
	})

	const getLetterStatus = (letter: string): string => {
		const currentLetter = letters[letter]
		if (currentLetter) return statusColorOptions[currentLetter]
		return 'bg-base-300 text-on-base'
	}

	const keysRow1 = [
		{ key: 'q', children: 'q', onClick: () => onKey('q') },
		{ key: 'w', children: 'w', onClick: () => onKey('w') },
		{ key: 'e', children: 'e', onClick: () => onKey('e') },
		{ key: 'r', children: 'r', onClick: () => onKey('r') },
		{ key: 't', children: 't', onClick: () => onKey('t') },
		{ key: 'y', children: 'y', onClick: () => onKey('y') },
		{ key: 'u', children: 'u', onClick: () => onKey('u') },
		{ key: 'i', children: 'i', onClick: () => onKey('i') },
		{ key: 'o', children: 'o', onClick: () => onKey('o') },
		{ key: 'p', children: 'p', onClick: () => onKey('p') },
	]
	const keysRow2 = [
		{ key: 'a', children: 'a', onClick: () => onKey('a') },
		{ key: 's', children: 's', onClick: () => onKey('s') },
		{ key: 'd', children: 'd', onClick: () => onKey('d') },
		{ key: 'f', children: 'f', onClick: () => onKey('f') },
		{ key: 'g', children: 'g', onClick: () => onKey('g') },
		{ key: 'h', children: 'h', onClick: () => onKey('h') },
		{ key: 'j', children: 'j', onClick: () => onKey('j') },
		{ key: 'k', children: 'k', onClick: () => onKey('k') },
		{ key: 'l', children: 'l', onClick: () => onKey('l') },
	]
	const keysRow3 = [
		{ key: 'Enter', children: 'Enter', onClick: () => onEnter() },
		{ key: 'z', children: 'z', onClick: () => onKey('z') },
		{ key: 'x', children: 'x', onClick: () => onKey('x') },
		{ key: 'c', children: 'c', onClick: () => onKey('c') },
		{ key: 'v', children: 'v', onClick: () => onKey('v') },
		{ key: 'b', children: 'b', onClick: () => onKey('b') },
		{ key: 'n', children: 'n', onClick: () => onKey('n') },
		{ key: 'm', children: 'm', onClick: () => onKey('m') },
		{
			key: 'Backspace',
			children: <Icon>backspace</Icon>,
			onClick: () => onBackspace(),
		},
	]

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex justify-center gap-2'>
				{keysRow1.map((item, index) => (
					<Button
						key={index}
						disabled={disabled}
						className={getLetterStatus(item.key)}
						onClick={item.onClick}
					>
						{item.children}
					</Button>
				))}
			</div>
			<div className='flex justify-center gap-2'>
				{keysRow2.map((item, index) => (
					<Button
						key={index}
						disabled={disabled}
						className={getLetterStatus(item.key)}
						onClick={item.onClick}
					>
						{item.children}
					</Button>
				))}
			</div>
			<div className='flex justify-center gap-2'>
				{keysRow3.map((item, index) => (
					<Button
						key={index}
						disabled={disabled}
						className={getLetterStatus(item.key)}
						onClick={item.onClick}
					>
						{item.children}
					</Button>
				))}
			</div>
		</div>
	)
}

export default WordleKeyboard
