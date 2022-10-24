import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'
import ReactPortal from '@/components/ReactPortal'
import { Overlay } from '@/components/ui/atoms'

type Handler = () => void

interface ModalPops {
	children?: undefined | React.ReactNode | React.ReactNode[]
	overlayColor?: string
	value?: boolean
	onClose?: Handler
	onOpen?: Handler
	onContentClick?: Handler
	onOverlayClick?: Handler
}

const noop = () => {}

const dropIn = {
	hidden: {
		y: '-100vh',
		opacity: 0,
	},
	visible: {
		y: '0',
		opacity: 1,
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: '100vh',
		opacity: 0,
	},
}

const Modal = (props: ModalPops) => {
	const {
		children,
		overlayColor,
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
	const handleOverlayClick = (): void => {
		onOverlayClick()
	}

	useEffect(() => {
		setInternalValue(value)
	}, [value])

	useEffect(() => {
		internalValue ? handleOpen() : handleClose()
	}, [internalValue])

	const modalClass = classNames('modal')

	return (
		<ReactPortal wrapperId='modal-root'>
			<AnimatePresence>
				{internalValue && (
					<Overlay color={overlayColor} onClick={handleOverlayClick}>
						<div className={modalClass}>
							<motion.div
								variants={dropIn}
								initial='hidden'
								animate='visible'
								exit='exit'
								onClick={handleContentClick}
							>
								{children}
							</motion.div>
						</div>
					</Overlay>
				)}
			</AnimatePresence>
		</ReactPortal>
	)
}

export default Modal
