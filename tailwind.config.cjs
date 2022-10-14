/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				success: '#66a060',
				warning: '#ceb02c',
				muted: '#939b9f',
				base: 'rgb(var(--color-base) / <alpha-value>)',
				'base-100': 'rgb(var(--color-base-100) / <alpha-value>)',
				'base-200': 'rgb(var(--color-base-200) / <alpha-value>)',
				'base-300': 'rgb(var(--color-base-300) / <alpha-value>)',
				'on-base': 'rgb(var(--color-on-base) / <alpha-value>)',
			},
			keyframes: {
				ripple: {
					'0%': { opacity: '0' },
					'25%': { opacity: '0.25' },
					'100%': {
						width: '200%',
						'padding-bottom': '200%',
						opacity: '0',
					},
				},
				'indeterminate-short-ltr': {
					'0%': { left: '-100%', right: '100%' },
					'60%': { left: '107%', right: '-8%' },
					to: { left: '107%', right: '-8%' },
				},
			},
			animation: {
				ripple: 'ripple 300ms ease-in',
				'spin-fast': 'spin 1s linear infinite',
				spin: 'spin 3s linear infinite',
				'spin-slow': 'spin 5s linear infinite',
				'indeterminate-short-ltr':
					'indeterminate-short-ltr 2s ease-out infinite',
			},
		},
	},
	plugins: [],
}
