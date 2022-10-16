import React from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

const noop = () => {}

type Handler = () => void

interface OverlayProps {
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	color?: string
	style?: React.CSSProperties
	onClick?: Handler
}

const Overlay = (props: OverlayProps) => {
    const {
		children,
		className,
		color = 'bg-black/50',
		style,
		onClick = noop,
	} = props

    const handleClick = (event: React.MouseEvent): void => {
		event.stopPropagation()
		onClick()
	}

    const overlayClass = classNames('overlay', color, className)

    return (
        <motion.div
            className={overlayClass}
            style={style}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
        >
            {children}
        </motion.div>
    )
}

export default Overlay