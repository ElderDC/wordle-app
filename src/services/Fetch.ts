interface IOption {
	params?: Record<string, string>
	headers?: Record<string, string>
}
interface IFetchOptions {
	baseURL: string
	headers?: Record<string, string>
	params?: Record<string, string>
}

class Fetch {
	private baseURL: string
	private headers: Record<string, string>
	private params: Record<string, string>

	constructor(options: IFetchOptions) {
		this.baseURL = options.baseURL || ''
		this.headers = options.headers || {}
		this.params = options.params || {}
	}

	getURLWithEndpoint(endpoint: string) {
		return new URL(endpoint, this.baseURL).toString()
	}

	getHeaders(headers?: Record<string, string>) {
		return { ...this.headers, ...headers }
	}

	getSearchParams(searchParams?: Record<string, string>) {
		const params = { ...this.params, ...searchParams }
		return new URLSearchParams(params).toString()
	}

	async get(endpoint: string = '', options: IOption = {}) {
		const url = this.getURLWithEndpoint(endpoint)
		const headers = this.getHeaders(options.headers)
		const searchParams = this.getSearchParams(options.params)
		const fullURL = `${url}/?${searchParams}`

		return (await fetch(fullURL, { headers })).json()
	}
}

export default Fetch
