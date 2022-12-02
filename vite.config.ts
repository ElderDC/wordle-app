/// <reference types="vitest" />
/// <reference types="Vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: resolve('src/'),
			'@': resolve('src/'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
	}
})
