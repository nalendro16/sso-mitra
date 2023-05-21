const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '10px',
      },
      dropShadow: {
        primary: '0 3px 12px rgba(255, 218, 0, 0.25)',
      },
      keyframes: {
        modalBodyAnim: {
          '0%': {
            transform: 'translateY(100px)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        alertAnim: {
          '0%': {
            transform: 'scale(0.7)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'ease-body': 'modalBodyAnim 0.8s ease 0s 1 normal forwards',
        'open-alert': 'alertAnim 0.4s ease 0s 1 normal forwards',
      },
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      yellow: '#F6AE2D',
      secondary: '#2c2829',
      gray: '#CECECE',
      pink: '#EBD2DF',
      apricot: '#FD6542',
      purple: '#4D69FF',
      primary: {
        more_lightest: '#FFF5FA',
        lightest: '#90CDEB',
        lighter: '#38A5DB',
        light: '#ad427a',
        base: '#229BD8',
        darker: '#114D6C',
      },
      black: {
        lighter: '#919191',
        light: '#5E5E5E',
        dark: '#1A1517',
        darker: '#070505',
      },
      neutral: {
        0: '#F9FAFB',
        10: '#EEF5FC',
        20: '#9CA3AF',
        30: '#808080',
        40: '4D4D4D',
      },
      active: '#178EE9',
      error: '#DB0707',
      success: '#06B73A',
      screen: '#FFF',
      highlight: '#F5CA80',
    },
    fontFamily: {
      bold: 'NunitoSans Bold',
      medium: 'NunitoSans Medium',
      regular: 'NunitoSans Regular',
      'semi-bold': 'NunitoSans SemiBold',
    },
    content: {
      width: '425px',
      padding: {
        x: '1rem',
        y: '5rem',
        b: '4rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.safe-top': {
          paddingTop: 'constant(safe-area-inset-top)',
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          paddingBottom: 'constant(safe-area-inset-bottom)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      })
    }),
  ],
}
