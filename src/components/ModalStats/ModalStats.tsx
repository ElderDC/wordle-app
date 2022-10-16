import { useSelector } from 'react-redux'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHead,
	Text,
} from '@/components/ui/atoms'
import { RootState } from '@/redux/store'
import { Modal, Timer } from '@/components/ui/molecules'

const noop = () => {}

type Handler = () => void

interface ModalStatsProps {
	value: boolean
	onClose?: Handler
}

const ModalStats = (props: ModalStatsProps) => {
	const { value = false, onClose = noop } = props

	const {
		lastTime,
		totalTries,
		successTries
	} = useSelector((state: RootState) => state.wordle)

	const handleClose = (): void => {
		onClose()
	}

	return (
		<Modal value={value} overlayColor='bg-base/80' onClose={handleClose}>
			<Card outlined rounded className='border-on-base w-[24rem] max-w-lg'>
				<CardHead className='text-center'>
					<Text size='h5' weight='bold'>
						Estadísticas
					</Text>
				</CardHead>
				<CardBody>
					<div className='flex justify-around mb-8'>
						<div className='flex flex-col items-center justify-center'>
							<Text size='h5' weight='bold'>
								{ totalTries }
							</Text>
							<Text weight='bold'>Jugadas</Text>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<Text size='h5' weight='bold'>
								{ successTries }
							</Text>
							<Text weight='bold'>Victorias</Text>
						</div>
					</div>
					{ !!lastTime && (
						<div className='flex flex-col items-center justify-center space-y-4'>
							<Text transform='uppercase'>Siguiente partida</Text>
							<Timer target={lastTime}></Timer>
						</div>
					)}
				</CardBody>
				<CardFooter className='flex justify-center'>
					<Button className='bg-success' onClick={handleClose}>
						Aceptar
					</Button>
				</CardFooter>
			</Card>
		</Modal>
	)
}

export default ModalStats
