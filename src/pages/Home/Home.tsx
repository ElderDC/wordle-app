import { useContext, useState } from 'react'
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
import { IThemeContext, ThemeContext } from '@/context'
import WordleWord from '@/components/WordleWord'

const Home = () => {
	const { theme, toggleTheme } = useContext(ThemeContext) as IThemeContext
	const [modalInfo, setModalInfo] = useState<boolean>(false)
	const [modalStat, setModalStat] = useState<boolean>(false)

	const [word, setWord] = useState<string>('manta')
	const [traits, setTraits] = useState<string[]>([])

	return (
		<div>
			<Card className='max-w-2xl mx-auto'>
				<CardHead className='flex items-center justify-between gap-2 pb-8'>
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
							onClick={toggleTheme}
						>
							<Icon>{theme === 'dark' ? 'light_mode' : 'dark_mode'}</Icon>
						</Button>
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
					</div>
				</CardHead>
				<CardBody className='bg-base'>
					<WordleWord value={traits[0]} word={word} />
					<WordleWord value={traits[1]} word={word} />
					<WordleWord value={traits[2]} word={word} />
					<WordleWord value={traits[3]} word={word} />
					<WordleWord value={traits[4]} word={word} />
				</CardBody>
				<CardFooter className='pt-8'></CardFooter>
			</Card>
			<ModalInfo value={modalInfo} onClose={() => setModalInfo(false)} />
			<ModalStats value={modalStat} onClose={() => setModalStat(false)} />
		</div>
	)
}

export default Home
