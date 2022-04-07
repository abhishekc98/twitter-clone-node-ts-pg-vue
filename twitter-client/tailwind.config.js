module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg':
          "url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')",
      },
      fontSize: {
        'landing-logo': '50vh',
      },
      fontFamily: {
        worksans: 'Work Sans',
      },
      fontWeight: {
        fontWeightCustom: 1000,
      },
    },
  },
  plugins: [],
};
