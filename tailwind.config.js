import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                cream: '#FFFBF0',
                ink: '#131313',
                blush: '#FF6B9D',
                soft: '#FDE047',
                lilac: '#A78BFA',
                teal: '#2DD4BF',
            },
            fontFamily: {
                sans: ['Space Grotesk', 'Figtree', ...defaultTheme.fontFamily.sans],
                display: ['Instrument Serif', ...defaultTheme.fontFamily.serif],
                hand: ['Caveat', 'cursive'],
            },
        },
    },

    plugins: [forms],
};
