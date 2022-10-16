import { useEffect, useState } from 'react'

function useKeyPress() {
	// State for keeping track of whether key is pressed
	const [keyPressed, setKeyPressed] = useState<string>('')

	const downHandler = (event: KeyboardEvent) => {
		setKeyPressed(event.key)
	}
	const upHandler = (_event: KeyboardEvent) => {
		setKeyPressed('')
	}
	// Add event listeners
	useEffect(() => {
		window.addEventListener('keydown', downHandler)
		window.addEventListener('keyup', upHandler)
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener('keydown', downHandler)
			window.removeEventListener('keyup', upHandler)
		}
	}, [])

	return keyPressed
}

export default useKeyPress
