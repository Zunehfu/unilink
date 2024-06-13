/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#1E1F22",
                dark2: "rgb(26,27,29)",
            },
        },
    },
    plugins: [],
};
