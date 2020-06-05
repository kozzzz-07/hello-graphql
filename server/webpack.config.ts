import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.graphql'],
  },
  target: 'node',
  externals: [nodeExternals()],
};

export default config;
