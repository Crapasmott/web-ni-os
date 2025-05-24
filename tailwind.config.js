/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'electric-blue': '#0099ff',
                'energy-yellow': '#ffcc00',
                'hydro-green': '#00cc66',
                'electrohuila': {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                }
            },
            animation: {
                'bounce-slow': 'bounce 2s infinite',
                'pulse-slow': 'pulse 3s infinite',
                'spin-slow': 'spin 3s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'electric': 'electric 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                electric: {
                    '0%, 100%': {
                        boxShadow: '0 0 5px #ffcc00, 0 0 10px #ffcc00, 0 0 15px #ffcc00'
                    },
                    '50%': {
                        boxShadow: '0 0 20px #ffcc00, 0 0 30px #ffcc00, 0 0 40px #ffcc00'
                    },
                }
            },
            fontFamily: {
                'display': ['system-ui', 'sans-serif'],
                'body': ['system-ui', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'electric': '0 0 20px rgba(59, 130, 246, 0.5)',
                'glow': '0 0 30px rgba(255, 204, 0, 0.3)',
            }
        },
    },
    plugins: [],
}