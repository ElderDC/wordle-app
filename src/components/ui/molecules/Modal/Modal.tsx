import { useEffect, useState } from 'react'
import classNames from 'classnames'
import ReactPortal from '@/components/ReactPortal'

const noop = () => {}

type Handler = () => void

interface ModalPops {
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	bgColor?: string
	style?: React.CSSProperties
	value?: boolean
	onClose?: Handler
	onOpen?: Handler
	onContentClick?: Handler
	onOverlayClick?: Handler
}

const Modal = (props: ModalPops) => {
	const {
		children,
		className,
		bgColor = 'bg-black/50',
		style,
		value = false,
		onClose = noop,
		onOpen = noop,
		onContentClick = noop,
		onOverlayClick = noop,
	} = props

	const [internalValue, setInternalValue] = useState<boolean>(value)

	const handleClose = (): void => {
		onClose()
	}
	const handleOpen = (): void => {
		onOpen()
	}
	const handleContentClick = (event: React.MouseEvent): void => {
		event.stopPropagation()
		onContentClick()
	}
	const handleOverlayClick = (event: React.MouseEvent): void => {
		event.stopPropagation()
		onOverlayClick()
	}

	useEffect(() => {
		setInternalValue(value)
	}, [value])

	useEffect(() => {
		internalValue ? handleOpen() : handleClose()
	}, [internalValue])

	const modalClass = classNames('modal', bgColor, className, {
		show: internalValue,
	})

	const modalContentClass = classNames('modal__content')

	return (
		<ReactPortal wrapperId='modal-root'>
			<div className={modalClass} style={style} onClick={handleOverlayClick}>
				<div className={modalContentClass}>
					<div onClick={handleContentClick}>
						{children}
					</div>
				</div>
			</div>
		</ReactPortal>
	)
}

export default Modal
