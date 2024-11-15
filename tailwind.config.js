/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        "primary-content": "rgb(var(--primary-content))",
        "primary-dark": "rgb(var(--primary-dark))",
        "primary-light": "rgb(var(--primary-light))",

        secondary: "rgb(var(--secondary))",
        "secondary-content": "rgb(var(--secondary-content))",
        "secondary-dark": "rgb(var(--secondary-dark))",
        "secondary-light": "rgb(var(--secondary-light))",

        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        border: "rgb(var(--border))",

        copy: "rgb(var(--copy))",
        "copy-light": "rgb(var(--copy-light))",
        "copy-lighter": "rgb(var(--copy-lighter))",

        "dark-background": "rgb(var(--dark-background))",
        "dark-foreground": "rgb(var(--dark-foreground))",
        "dark-border": "rgb(var(--dark-border))",

        "dark-copy": "rgb(var(--dark-copy))",
        "dark-copy-light": "rgb(var(--dark-copy-light))",
        "dark-copy-lighter": "rgb(var(--dark-copy-lighter))",

        success: "rgb(var(--success))",
        warning: "rgb(var(--warning))",
        error: "rgb(var(--error))",

        "success-content": "rgb(var(--success-content))",
        "warning-content": "rgb(var(--warning-content))",
        "error-content": "rgb(var(--error-content))"
      },
    },
  },
  plugins: [],
}