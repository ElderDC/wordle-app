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
import { resetWordleState, setLastTime, setSuccessTries, setTotalTries, setTries } from '@/redux/states/wordle.state'

const MAX_TRIES = 5

const Home = () => {
	const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext
	const [modalInfo, setModalInfo] = useState<boolean>(false)
	const [modalStat, setModalStat] = useState<boolean>(false)

	const {
		word,
		tries,
		totalTries,
		successTries,
	} = useSelector((state: RootState) => state.wordle)
	const dispatch = useDispatch()

	const [currentTried, setCurrentTried] = useState<string>('')
	const [disabled, setDisabled] = useState<boolean>(false)

	useEffect(() => {
		if (tries.at(-1) === word || tries.length === MAX_TRIES) {
			setDisabled(true)
		} else {
			setDisabled(false)
		} 
	}, [tries])
	

	const handleKey = (key: string) => {
		if (currentTried.length < 5 && /^[a-zA-Z]+$/.test(key)) setCurrentTried(preVal => (preVal += key))
	}
	const handleBackspace = () => {
		if (currentTried.length > 0) setCurrentTried(preVal => (preVal.slice(0, -1)))
	}
	const handleEnter = async () => {
		if (currentTried.length < 5) return
		if (tries.length >= MAX_TRIES) return
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
			dispatch(setLastTime(Date.now()))
			return
		}
		if (updatedTries.length === MAX_TRIES) {
			dispatch(setTotalTries(totalTries + 1))
			dispatch(setLastTime(Date.now()))
		}
	}
	const getValue = (index: number) => {
		if (tries[index]) return tries[index]
		if (tries.length >= index) return currentTried
		return ''
	}

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
					{ Array.apply(null, Array(MAX_TRIES)).map((item, index) => (
						<WordleWord
							key={`word-${index}`}
							value={getValue(index)}
							word={word}
							validated={!!tries[index]}
						/>
					)) }
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
