module.exports = {
    content: ['./layouts/**/*.html', './content/**/*.md'],
    // theme: {
    //     extend: {
    //         typography: {
    //             DEFAULT: {
    //                 css: {
    //                     "code::before": { content: '' },
    //                     "code::after": { content: '' }
    //                 }
    //             }
    //         }
    //     }
    // },
    daisyui: {
        logs: false,
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
