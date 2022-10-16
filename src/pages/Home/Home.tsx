import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHead,
	Icon,
	Text,
} from '@/components/ui/atoms'
import ModalInfo from '@/components/ModalInfo'
import ModalStats from '@/components/ModalStats'
import WordleWord from '@/components/WordleWord'
import WordleKeyboard from '@/components/WordleKeyboard'
import { IThemeContext, ThemeContext } from '@/context'
import { RootState } from '@/redux/store'
import {
	resetWordleState,
	setLastTime,
	setSuccessTries,
	setTotalTries,
	setTries,
	setWord,
} from '@/redux/states/wordle.state'
import { askWordService, getWordService } from '@/services/wordle.service'
import { addTime } from '@/utils/time.util'
import { IntervalOption } from '@/models/time.model'
import { useCountDown } from '@/hooks'

const MAX_TRIES: number = 5
const COUNTDOWN_INTERVAL: number = 5
const COUNTDOWN_UNIT: IntervalOption = IntervalOption.MINUTES

const Home = () => {
	const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext
	const { word, tries, lastTime, firstTime, totalTries, successTries } =
		useSelector((state: RootState) => state.wordle)
	const dispatch = useDispatch()

	const [modalInfo, setModalInfo] = useState<boolean>(firstTime === 0)
	const [modalStat, setModalStat] = useState<boolean>(false)
	const [currentTried, setCurrentTried] = useState<string>('')
	const [disabled, setDisabled] = useState<boolean>(false)

	const handleKey = (key: string) => {
		if (currentTried.length < 5 && /^[a-zA-Z]+$/.test(key))
			setCurrentTried((preVal) => (preVal += key))
	}
	const handleBackspace = () => {
		if (currentTried.length > 0)
			setCurrentTried((preVal) => preVal.slice(0, -1))
	}
	const handleEnter = async () => {
		if (currentTried.length < 5) return
		if (tries.length >= MAX_TRIES) return
		//
		const askForWord = await askWordService(currentTried)
		if (!askForWord.data.Response) return
		//
		const updatedTries = [...tries, currentTried]
		dispatch(setTries(updatedTries))
		checkLastTried(updatedTries)
		setCurrentTried('')
	}
	const checkLastTried = (updatedTries: string[]) => {
		if (updatedTries.at(-1) === word) {
			dispatch(setSuccessTries(successTries + 1))
			dispatch(setTotalTries(totalTries + 1))
			dispatch(
				setLastTime(
					addTime(COUNTDOWN_INTERVAL, IntervalOption[COUNTDOWN_UNIT]).getTime()
				)
			)
			setModalStat(true)
			return
		}
		if (updatedTries.length === MAX_TRIES) {
			dispatch(setTotalTries(totalTries + 1))
			dispatch(
				setLastTime(
					addTime(COUNTDOWN_INTERVAL, IntervalOption[COUNTDOWN_UNIT]).getTime()
				)
			)
			setModalStat(true)
		}
	}
	const getWord = async () => {
		try {
			const word = await getWordService()
			dispatch(setTries([]))
			dispatch(setWord(word.data.Response))
		} catch (error) {
			console.log(error)
		}
	}
	const getValue = (index: number) => {
		if (tries[index]) return tries[index]
		if (tries.length >= index) return currentTried
		return ''
	}

	useCountDown(lastTime, {
		onEnd: () => {
			dispatch(setLastTime(0))
			dispatch(setWord(''))
		},
	})

	useEffect(() => {
		if (!word) getWord()
	}, [word])

	useEffect(() => {
		if (tries.at(-1) === word || tries.length === MAX_TRIES) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
	}, [tries])

	return (
		<div>
			<Card className='max-w-2xl my-8 mx-auto'>
				<CardHead className='flex items-center justify-between gap-2 pb-8'>
					<div className='flex'>
						<Button
							className='text-on-base'
							size='sm'
							icon
							text
							rounded
							onClick={() => setModalInfo(true)}
						>
							<Icon>help</Icon>
						</Button>
						<Button
							className='text-on-base'
							size='sm'
							icon
							text
							rounded
							onClick={() => dispatch(resetWordleState())}
						>
							<Icon>restart_alt</Icon>
						</Button>
					</div>
					<Text size='h5' transform='uppercase' weight='bold'>
						Wordle
					</Text>
					<div className='flex'>
						<Button
							className='text-on-base'
							size='sm'
							icon
							text
							rounded
							onClick={() => setModalStat(true)}
						>
							<Icon>analytics</Icon>
						</Button>
						<Button
							className='text-on-base'
							size='sm'
							icon
							text
							rounded
							onClick={toggleTheme}
						>
							<Icon>{theme === 'dark' ? 'light_mode' : 'dark_mode'}</Icon>
						</Button>
					</div>
				</CardHead>
				<CardBody className='bg-base py-16'>
					{Array.apply(null, Array(MAX_TRIES)).map((item, index) => (
						<WordleWord
							key={`word-${index}`}
							value={getValue(index)}
							word={word}
							validated={!!tries[index]}
						/>
					))}
				</CardBody>
				<CardFooter className='pt-8'>
					<WordleKeyboard
						disabled={disabled}
						onKey={handleKey}
						onEnter={handleEnter}
						onBackspace={handleBackspace}
					/>
				</CardFooter>
			</Card>
			<ModalInfo value={modalInfo} onClose={() => setModalInfo(false)} />
			<ModalStats value={modalStat} onClose={() => setModalStat(false)} />
		</div>
	)
}

export default Home
