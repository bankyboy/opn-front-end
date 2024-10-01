const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: 'public',
  },

  module: {
    rules: [
      {
        test: /\.css$/, // Handle CSS files (for Tailwind)
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader', // Turns CSS into JavaScript
          'postcss-loader', // PostCSS for processing Tailwind
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Enable imports without specifying extensions
  },

  mode: 'development',
};

module.exports = config;
