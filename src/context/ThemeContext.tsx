import React, { createContext, useEffect } from 'react'
import { useLocalStorage } from '@/hooks'

interface ThemeProviderProps {
	children?: undefined | React.ReactNode | React.ReactNode[]
}
export interface IThemeContext {
	theme: string
	toggleTheme: () => void
}

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeProvider = (props: ThemeProviderProps) => {
	const { children } = props

	const getDefaultTheme = (): 'dark' | 'light' => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	}

	const [theme, setTheme] = useLocalStorage<'dark' | 'light'>(
		'theme',
		getDefaultTheme()
	)

	const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
