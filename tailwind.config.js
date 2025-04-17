/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "none",
						color: "#333",
						a: {
							color: "#3182ce",
							"&:hover": {
								color: "#2c5282",
							},
						},
					},
				},
			},
			animation: {
				"gradient-x": "gradient-x 3s ease infinite",
			},
			keyframes: {
				"gradient-x": {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
