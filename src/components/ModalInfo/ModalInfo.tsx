import { useDispatch, useSelector } from 'react-redux'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHead,
	Text,
} from '@/components/ui/atoms'
import { Modal } from '@/components/ui/molecules'
import WordleWord from '@/components/WordleWord'
import { setFirstTime } from '@/redux/states/wordle.state'
import { RootState } from '@/redux/store'
import { IWordleLetterStatus } from '@/models/wordle.model'

const noop = () => {}

type Handler = () => void

interface ModalInfoProps {
	value: boolean
	onClose?: Handler
}

const ModalInfo = (props: ModalInfoProps) => {
	const { value = false, onClose = noop } = props
	const { firstTime } = useSelector((state: RootState) => state.wordle)
	const dispatch = useDispatch()

	const handleClose = (): void => {
		if (firstTime === 0) dispatch(setFirstTime(Date.now()))
		onClose()
	}

	return (
		<Modal value={value} overlayColor='bg-base/80' onClose={handleClose}>
			<Card outlined rounded className='border-on-base max-w-lg'>
				<CardHead className='text-center'>
					<Text size='h5' weight='bold'>
						Cómo jugar
					</Text>
				</CardHead>
				<CardBody>
					<Text>Adivina la palabra oculta en cinco intentos.</Text>
					<Text>Cada intento debe ser una palabra valida de 5 letras.</Text>
					<Text>
						Después de cada intento el color de las letras cambia para mostrar
						qué tan cerca estás de acertar la palabra.
					</Text>
					<Text weight='bold'>Ejemplo</Text>
					<WordleWord
						value='gatos'
						word='g****'
						example={IWordleLetterStatus.correct}
					/>
					<Text>
						La letra <Text weight='bold'>G</Text> esta en la palabra y posición
						correcta.
					</Text>
					<WordleWord
						value='vocal'
						word='**c**'
						example={IWordleLetterStatus.present}
					/>
					<Text>
						La letra <Text weight='bold'>C</Text> esta en la palabra pero en la
						posición incorrecta.
					</Text>
					<WordleWord
						value='canto'
						word='****u'
						example={IWordleLetterStatus.absent}
					/>
					<Text>
						La letra <Text weight='bold'>O</Text> no esta en la palabra.
					</Text>
					<Text>
						Puede haber letras repetidas. Las pistas son independientes para
						cada letra.
					</Text>
					<Text>¡Una palabra nueva cada 5 minutos!</Text>
				</CardBody>
				<CardFooter className='flex justify-center'>
					<Button className='bg-success' onClick={handleClose}>
						!JUGAR¡
					</Button>
				</CardFooter>
			</Card>
		</Modal>
	)
}

export default ModalInfo
