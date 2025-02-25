/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Mono', 'monospace'],
    },
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
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
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'grid-pattern': 'linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
  			'grid-pattern-light': 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
  		},
  		keyframes: {
  			grid: {
  				'0%': { transform: 'translateY(0)' },
  				'100%': { transform: 'translateY(calc(var(--cell-size) * -1))' }
  			},
  			'border-pulse': {
  				'0%, 100%': { opacity: 0.2 },
  				'50%': { opacity: 0.5 }
  			},
  			'gradient': {
  				'0%, 100%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  			},
  			'slide-rtl': {
  				'0%': { transform: 'translateX(100%)' },
  				'100%': { transform: 'translateX(-100%)' }
  			},
  			'glow-slow': {
  				'0%, 100%': {
  					opacity: 0.3,
  					transform: 'translateX(-5%) translateY(-5%)'
  				},
  				'50%': {
  					opacity: 0.5,
  					transform: 'translateX(5%) translateY(5%)'
  				}
  			},
  			shine: {
  				'0%': { transform: 'translateX(-100%) skewX(-12deg)' },
  				'100%': { transform: 'translateX(100%) skewX(-12deg)' }
  			},
  		},
  		animation: {
  			grid: 'grid 20s linear infinite',
  			'border-pulse': 'border-pulse 8s ease-in-out infinite',
  			'gradient': 'gradient 15s linear infinite',
  			'pulse': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'slide-rtl': 'slide-rtl 15s linear infinite',
  			'slide-rtl-delayed': 'slide-rtl 15s linear infinite -7.5s',
  			'glow-slow': 'glow-slow 8s ease-in-out infinite',
  			'glow-slow-delayed': 'glow-slow 8s ease-in-out infinite -4s',
  			'shine': 'shine 1s ease-in-out',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

