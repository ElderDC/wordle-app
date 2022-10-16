import axios from 'axios'

const WORDLE_API_URL =
	import.meta.env.VITE_WORDLE_API_URL ||
	'https://thatwordleapi.azurewebsites.net'

const wordleAPI = axios.create({
	baseURL: WORDLE_API_URL,
	timeout: 1000,
})

export const getWordService = async () => {
	return wordleAPI.get('/get')
}

export const askWordService = async (word: string) => {
	return wordleAPI.get('/ask', {
		params: { word },
	})
}
