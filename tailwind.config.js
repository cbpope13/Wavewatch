/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			gridTemplateRows: {
				12: 'repeat(12, minmax(0, 1fr))',
			},
			gridRowStart: {
				8: '8',
				9: '9',
				10: '10',
				11: '11',
				12: '12',
			},
			gridRowEnd: {
				8: '8',
				9: '9',
				10: '10',
				11: '11',
				12: '12',
			},
			gridRow: {
				'span-8': 'span 8 / span 8',
				'span-9': 'span 9 / span 9',
				'span-10': 'span 10 / span 10',
				'span-11': 'span 11 / span 11',
				'span-12': 'span 12 / span 12',
			},
		},
		plugins: [],
	},
};
