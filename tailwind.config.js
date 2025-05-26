/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust this path to match your project structure
    "./components/**/*.{js,jsx,ts,tsx}", // Add this to include your components folder
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#333333",
        accent: "#EE8220",
        hover: "#3366FF",
        heading: "#002147",
        muted: "#f9fafb",
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
        scaleIn: 'scaleIn 0.35s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'Arial', 'sans-serif'],
        heading: ['Montserrat', 'Arial', 'sans-serif'],
        body: ['Source Sans Pro', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // Custom font sizes 
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
        // Navigation specific sizes
        'nav': '0.9375rem',  // 15px - for navigation items
        // Button text size
        'button': '1rem',    // 16px - for buttons
        // Header sizes
        'h1': '2.5rem',      // 40px
        'h2': '2rem',        // 32px
        'h3': '1.5rem',      // 24px
        'h4': '1.25rem',     // 20px
        'h5': '1.125rem',    // 18px
        'h6': '1rem',        // 16px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        // slightly wider spacing for navigation
        nav: '0.03em',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        // Custom line heights
        'heading': '1.2',    // For headings
        'body': '1.6',       // For body text
      },
      spacing: {
        section: "5rem",
        container: "1.5rem",
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        md: "0.5rem",
      },
    },
  },
  plugins: [],
};
