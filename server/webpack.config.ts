import * as path from 'path';
import * as webpack from 'webpack';
import * as nodeExternals from 'webpack-node-externals';

const config: webpack.Configuration = {
  mode: 'production',
  // mode: 'development',
  entry: './src/index.ts',
  // entry: ['./src/index.ts', './src/typeDefs.graphql'],
  // entry: {
  //   'app.js': './src/index.ts',
  //   'typeDefs.graphql': './src/typeDefs.graphql',
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name]',
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
