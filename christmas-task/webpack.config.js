const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: {
    index: './src/index.ts',
  },
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
      minify: false
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/data', to: 'assets/data' },
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler,'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'assets/fonts/[name][ext]'
        },
      },
      {
        test: /\.mp3/i,
        type: 'asset/resource',
        generator: {
            filename: 'assets/sounds/[name][ext]'
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'assets/img/[name][ext]'
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'assets/svg/[name][ext]'
        },
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
  },
};

  module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }

  return config;
};
