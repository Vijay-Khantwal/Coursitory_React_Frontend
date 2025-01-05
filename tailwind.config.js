/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primaryBackground: '#FFFFFF',   // White background
        text: '#333333',                 // Dark gray text
        primaryActionButton: '#007BFF', // Blue for primary action button
        secondaryButton: '#28A745',     // Green for secondary button
        linkColor: '#1A73E8',           // Light blue for links
        accentColor: '#FFA500',         // Orange for accent color
        errorMessage: '#D9534F',        // Red for error message
        successMessage: '#5CB85C',      // Green for success message
        warningMessage: '#F0AD4E',      // Yellow for warning message
        backgroundSections: '#F8F9FA',  // Light gray background for sections
        secondaryText: '#6C757D',    
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

