/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				clamp_sm: "clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)",
				clamp_base: "clamp(1rem, 0.34vw + 0.91rem, 1.19rem)",
				clamp_md: "clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)",
				clamp_lg: "clamp(1.56rem, 1vw + 1.31rem, 2.11rem)",
				clamp_xl: "clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)",
				clamp_xxl: "clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)",
				clamp_xxxl: "clamp(3.05rem, 3.54vw + 2.17rem, 5rem)",
			},
		},
	},
	// plugins: [require("@tailwindcss/typography")],
};
