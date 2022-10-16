import React, { useState } from "react";
import { motion } from 'framer-motion'
import classNames from "classnames";

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface SwitchProps {
    value: boolean | string | number
    trueValue?: boolean | string | number
    falseValue?: boolean | string | number
    className?: string
    handleClassName?: string
    size?: SwitchSize
    onChange?: (_value: boolean | string | number) => void
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
}

const noop = () => {}

const sizeOptions: Record<SwitchSize, string> = {
	xs: 'switch-xs',
	sm: 'switch-sm',
	md: 'switch-md',
	lg: 'switch-lg',
	xl: 'switch-xl',
}

const Switch = React.forwardRef<any, SwitchProps>(function Switch(props, ref) {
    const {
        value,
        trueValue = true,
        falseValue = false,
        className,
        handleClassName,
        size = 'md',
        onChange = noop,
    } = props

    const [internalValue, setInternalValue] = useState<boolean | string | number>(value);

    const getSwitchSize = (size: SwitchSize): string => {
		return sizeOptions[size]
	}
    const handleSwitch = () => {
        const newValue = trueValue === internalValue ? falseValue : trueValue
        setInternalValue(newValue)
        onChange(newValue)
    }

    const switchClass = classNames('switch', className, getSwitchSize(size))
    const handleClass = classNames('handle', handleClassName)

	return (
        <div ref={ref} className={switchClass} data-on={trueValue === internalValue} onClick={handleSwitch}>
            <motion.div className={handleClass} layout transition={spring} />
        </div>
    )
})

export default Switch
