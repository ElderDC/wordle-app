import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHead,
	Text,
} from '@/components/ui/atoms'
import { Modal } from '@/components/ui/molecules'

const noop = () => {}

type Handler = () => void

interface ModalStatsProps {
	value: boolean
	onClose?: Handler
}

const ModalStats = (props: ModalStatsProps) => {
	const { value = false, onClose = noop } = props

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
								8
							</Text>
							<Text weight='bold'>Jugadas</Text>
						</div>
						<div className='flex flex-col items-center justify-center'>
							<Text size='h5' weight='bold'>
								2
							</Text>
							<Text weight='bold'>Victorias</Text>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center space-y-4'>
						<Text transform='uppercase'>Siguiente partida</Text>
						<Text size='h6' weight='bold'>
							04:10
						</Text>
					</div>
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
