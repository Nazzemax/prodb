import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: 'hsl(var(--background))',
                    gray: 'hsl(var(--background-gray))',
                    gray2: 'hsl(var(--background-gray-2))',
                    dark: 'hsl(var(--background-dark))',
                    dark2: 'hsl(var(--background-dark-2))'
                },
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    hover: 'hsl(var(--accent-hover))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                gray: "hsl(var(--gray))",
                gray2: "hsl(var(--gray-2))",
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                graphic: {
                    'light': 'hsl(var(--graphic-light))',
                    'gray': 'hsl(var(--graphic-gray))',
                    'gray2': 'hsl(var(--graphic-gray-2))',
                    'dark': 'hsl(var(--graphic-dark))',
                }
            },
            borderRadius: {
                lg: 'calc(var(--radius) + 8px)',
                md: 'var(--radius)',
                sm: 'calc(var(--radius) - 8px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'loop-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' }
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'loop-scroll': 'loop-scroll 20s linear infinite',
            },
            lineClamp: {
                7: '7',
                8: '8',
                9: '9',
                10: '10',
            },
            fontSize: {
                xs: ['0.875rem', { lineHeight: '1rem' }], //14px
                sm: ['1rem', { lineHeight: '1.5rem' }], //16px
                base: ['1.125rem', { lineHeight: '1.75rem' }], //18px
                lg: ['1.25rem', { lineHeight: '1.75rem' }], //20px
                xl: ['1.5rem', { lineHeight: '2rem' }], //24px
                '2xl': ['1.75rem', { lineHeight: '2rem' }], //28px
                '3xl': ['2.5rem', { lineHeight: '1' }], //40px
                '4xl': ['4rem', { lineHeight: '1' }], //64px
                '5xl': ['4.25rem', { lineHeight: '1' }], //68px
                '6xl': ['4.5rem', { lineHeight: '1' }] //72px
            }
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
