import classNames from 'classnames'
import React from 'react'

interface IconProps {
	children?: undefined | React.ReactNode | React.ReactNode[]
	className?: string
	style?: React.CSSProperties
	symbol?: boolean
}

const Icon = React.forwardRef<any, IconProps>(function Icon(props, ref) {
	const { children, className, style, symbol } = props
	const iconClass = classNames(className, {
		'material-icons': !symbol,
		'material-symbols': symbol,
	})

	return (
		<span className={iconClass} ref={ref} style={style}>
			{children}
		</span>
	)
})

export default Icon
