/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#1E1F22",
                dark2: "rgb(26,27,29)",

                body: "#FAF9F6",
                offwhite: "#FFFAFA",
            },
            boxShadow: {
                "t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
                "t-md": "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "t-lg": "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                "t-xl": "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                "t-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
                "t-3xl": "0 -35px 60px -15px rgba(0, 0, 0, 0.3)",
            },
            backgroundImage: {
                "dot-texture":
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
            },

            fontFamily: {
                lexend: ["Lexend"],
                futura: ["Futura"],
                inter: ["Inter"],
            },
        },
    },
    plugins: [],
};
