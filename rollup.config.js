import babel from 'rollup-plugin-babel';

export default {
  input: `${__dirname}/index.js`,
  output: {
    name: 'huna',
    file: `${__dirname}/lib/index.js`,
    format: 'umd'
  },
  plugins: [
    babel({
      presets: [['env', {modules: false}]],
      plugins: ['transform-object-rest-spread']
    })
  ]
};
