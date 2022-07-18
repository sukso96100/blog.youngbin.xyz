const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./layouts/**/*.html', './content/**/*.md'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Pretendard JP"', ...defaultTheme.fontFamily.sans],
            },
        }
    },
    daisyui: {
        logs: false,
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
