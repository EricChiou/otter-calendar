/* eslint-disable no-undef */
module.exports = {
  mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '1240px',
      lg: '1440px',
    },
    colors: {
      // white
      'white': '#fff',
      'white-2': '#eee',
      'white-3': '#ddd',
      // light green
      'light-green': '#bbdfc8',
      // green
      'green': '#75cfb8',
      'green-2': '#40b598',
      // red
      'red': '#f00',
      // mask
      'mask': 'rgba(0, 0, 0, 0.1)',
      'mask-2': 'rgba(0, 0, 0, 0.2)',
      'mask-3': 'rgba(0, 0, 0, 0.3)',
      'mask-4': 'rgba(0, 0, 0, 0.4)',
      'mask-5': 'rgba(0, 0, 0, 0.5)',
      'mask-6': 'rgba(0, 0, 0, 0.6)',
      'mask-7': 'rgba(0, 0, 0, 0.7)',
      'mask-8': 'rgba(0, 0, 0, 0.8)',
    },
    extend: {},
  },
  plugins: [],
};
