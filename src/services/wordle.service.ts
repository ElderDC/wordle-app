import Fetch from '@/services/Fetch'

const WORDLE_API_URL =
	import.meta.env.VITE_WORDLE_API_URL ||
	'https://thatwordleapi.azurewebsites.net'

const wordleAPI = new Fetch({ baseURL: WORDLE_API_URL })

export const getWordService = () => {
	return wordleAPI.get('/get')
}

export const askWordService = (word: string) => {
	return wordleAPI.get('/ask', { params: { word } })
}
