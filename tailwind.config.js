/** @type {import('tailwindcss').Config} */
export const content = ["./*.{html,js}"];
export const theme = {
	extend: {
		colors: {
			primary: "#0D6EFD0D",
			button: "#0D6EFD",
			dark1: '#100F0F',
			dark2: "#403F3F",
		},
	},

	fontFamily: {
		poppin: '"Poppins", sans-serif',
	},
};
export const plugins = [require("daisyui")];
