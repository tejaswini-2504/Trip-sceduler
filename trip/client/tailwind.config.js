export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59,130,246,0.25), transparent 40%), linear-gradient(180deg, #0f172a 0%, #0d1323 100%)',
      },
    },
  },
  plugins: [],
};
