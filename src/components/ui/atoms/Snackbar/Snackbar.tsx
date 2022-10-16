import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import classNames from "classnames"
import ReactPortal from "@/components/ReactPortal"

type Handler = () => void

interface SnackbarProps {
    children?: undefined | React.ReactNode | React.ReactNode[]
    className?: string
    timeout?: number
    value?: boolean
    onClose?: Handler
    onOpen?: Handler
}

const noop = () => {}

const dropIn = {
    hidden: {
		y: "100%",
		opacity: 0,
    },
    visible: {
		y: "0",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
    },
    exit: {
		y: "100%",
		opacity: 0,
    },
};

const Snackbar = (props: SnackbarProps) => {
    const {
		children,
        className,
        timeout = 1000,
		value = false,
		onClose = noop,
		onOpen = noop,
	} = props

    const [internalValue, setInternalValue] = useState<boolean>(value)

    const handleClose = (): void => {
		onClose()
	}
	const handleOpen = (): void => {
		onOpen()
	}

    useEffect(() => {
        if (value) {
            setInternalValue(true)
            setTimeout(() => setInternalValue(false), timeout)
        }
	}, [value])

    useEffect(() => {
		internalValue ? handleOpen() : handleClose()
	}, [internalValue])

    const snackbarClass = classNames('snackbar', className)

    return (
        <ReactPortal wrapperId='snackbar-root'>
            <div className="fixed bottom-0 w-screen flex justify-center">
                <AnimatePresence>
                    { internalValue && (
                        <motion.div
                            variants={dropIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={snackbarClass}
                        >
                            { children }
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </ReactPortal>
    )
}

export default Snackbar