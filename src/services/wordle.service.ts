const WORDLE_API_URL =
	import.meta.env.VITE_WORDLE_API_URL ||
	'https://thatwordleapi.azurewebsites.net'

const wordleAPI = async (endpoint: string, params?: Record<string, any>) => {
	const url = (new URL(endpoint, WORDLE_API_URL)).toString()
	const serarchParams = (new URLSearchParams(params)).toString()
	const fullURL = `${url}/?${serarchParams}`

	return (await fetch(fullURL)).json()
}

export const getWordService = () => {
	return wordleAPI('/get')
}

export const askWordService = (word: string) => {
	return wordleAPI('/ask', { word })
}
