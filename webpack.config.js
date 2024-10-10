path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  mode: 'development',
  devtool: 'source-map',
};
