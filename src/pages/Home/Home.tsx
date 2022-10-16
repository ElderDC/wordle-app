import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHead,
	Icon,
	Snackbar,
	Switch,
	Text,
	Tooltip,
} from '@/components/ui/atoms'
import AnimatePage from '@/components/AnimatePage'
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
	const [badWordSnackbar, setBadWordSnackbar] = useState(false)
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
		if (tries.length >= MAX_TRIES) return
		if (currentTried.length < 5) return
		///
		const validWord = await checkWord(currentTried)
		if (!validWord) return setBadWordSnackbar(true)
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
	const checkWord = async (value: string): Promise<boolean> => {
		let result = true
		try {
			const askForWord = await askWordService(value)
			result = askForWord.data.Response
		} catch (error) {
			console.log(error)
		}
		return result
	}
	const getWord = async () => {
		try {
			const word = await getWordService()
			dispatch(setTries([]))
			dispatch(setWord(word.data.Response))
		} catch (error) {
			console.log(error)
			dispatch(setTries([]))
			dispatch(setWord('error'))
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
		<AnimatePage>
			<Card className='max-w-2xl my-8 mx-auto'>
				<CardHead className='flex items-center justify-between gap-2 pb-8'>
					<div className='flex'>
						<Tooltip bottom content={'Información'}>
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
						</Tooltip>
						<Tooltip bottom content={'Reiniciar'}>
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
						</Tooltip>
					</div>
					<Text size='h5' transform='uppercase' weight='bold'>
						Wordle
					</Text>
					<div className='flex items-center'>
						<Tooltip bottom content={'Estadisticas'}>
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
						</Tooltip>
						<Tooltip bottom content={'Cambiar tema'}>
							<Switch
								className={
									theme === 'dark'
										? 'bg-gradient-to-b from-sky-900 to-sky-300'
										: 'bg-gradient-to-b from-cyan-300 to-yellow-200'
								}
								handleClassName={
									theme === 'dark' ? 'bg-slate-100' : 'bg-amber-500'
								}
								value={theme}
								trueValue={'dark'}
								falseValue={'light'}
								size='sm'
								onChange={toggleTheme}
							/>
						</Tooltip>
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
			<Snackbar
				value={badWordSnackbar}
				timeout={3000}
				onClose={() => setBadWordSnackbar(false)}
			>
				<Text size='body2'>La palabra no es valida</Text>
			</Snackbar>
			<ModalInfo value={modalInfo} onClose={() => setModalInfo(false)} />
			<ModalStats value={modalStat} onClose={() => setModalStat(false)} />
		</AnimatePage>
	)
}

export default Home
