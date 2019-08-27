const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
        {
          loader:'style-loader'
        },
        {
          loader:'css-loader'
        },
        {
          loader:'less-loader'
        }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ],
  },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    library: 'selectionCursor',
    path: path.resolve(__dirname, 'dist')
  }
};
