import React from 'react'
import classNames from 'classnames'
import Ripple from '@/components/ui/atoms/Ripple'
import { Link, To } from 'react-router-dom'

type Handler = (_event: React.MouseEvent) => void

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps {
	block?: boolean
	children: undefined | React.ReactNode | React.ReactNode[]
	rounded?: boolean
	className?: string
	disabled?: boolean
	href?: string
	ghost?: boolean
	outlined?: boolean
	size?: ButtonSize
	style?: React.CSSProperties
	icon?: boolean
	text?: boolean
	to?: To
	type?: 'button' | 'submit' | 'reset' | undefined
	onClick?: Handler
	onDoubleClick?: Handler
	onMouseDown?: Handler
	onMouseUp?: Handler
}

const noop = (): false => {
	return false
}

const sizeOptions: Record<ButtonSize, string> = {
	xs: 'btn-xs',
	sm: 'btn-sm',
	md: 'btn-md',
	lg: 'btn-lg',
	xl: 'btn-xl',
}

const Button = React.forwardRef<any, ButtonProps>(function Button(props, ref) {
	const {
		block = false,
		children,
		rounded,
		className,
		disabled = false,
		href,
		ghost = false,
		outlined = false,
		size = 'md',
		style,
		icon = false,
		text = false,
		to,
		type = 'button',
		onClick = noop,
		onDoubleClick = noop,
		onMouseDown = noop,
		onMouseUp = noop,
	} = props

	const getButtonSize = (size: ButtonSize): string => {
		return sizeOptions[size]
	}
	const handleClick = (event: React.MouseEvent): void => {
		if (disabled) return
		onClick(event)
	}
	const handleDoubleClick = (event: React.MouseEvent): void => {
		if (disabled) return
		onDoubleClick(event)
	}
	const handleMouseDown = (event: React.MouseEvent): void => {
		if (disabled) return
		onMouseDown(event)
	}
	const handleMouseUp = (event: React.MouseEvent): void => {
		if (disabled) return
		onMouseUp(event)
	}

	const btnClass = classNames('btn', className, getButtonSize(size), {
		'btn-block': block,
		'btn-rounded': rounded,
		'btn-ghost': ghost,
		'btn-outlined': outlined,
		'btn-icon': icon,
		'btn-text': text,
		'btn-disabled': disabled,
		'overflow-hidden': true,
		relative: true,
	})

	if (to) {
		return (
			<Link
				to={to}
				className={btnClass}
				style={style}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
				{children}
				<Ripple />
			</Link>
		)
	}

	if (href) {
		return (
			<a
				ref={ref}
				href={href}
				className={btnClass}
				style={style}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
				{children}
				<Ripple />
			</a>
		)
	}

	return (
		<button
			ref={ref}
			className={btnClass}
			style={style}
			type={type}
			onClick={handleClick}
			onDoubleClick={handleDoubleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			{children}
			<Ripple />
		</button>
	)
})

export default Button
