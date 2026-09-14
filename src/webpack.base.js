const webpack = require('webpack')
const CopyPlugin = require("copy-webpack-plugin")
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prod = process.env.NODE_ENV === 'production';
require('dotenv').config()

module.exports = function defaultWebpack({
  entry, outputdir, env, copypatterns, port,
}) {
  return {
    // this prevent warning:
    // DevTools failed to load SourceMap: Could not load content for webpack:///node_modules/[package]/[folder]/[file].js.map: HTTP error: status code 404, net::ERR_UNKNOWN_URL_SCHEME
    devtool: prod ? undefined : 'source-map',

    mode: prod ? 'production' : 'development',
    entry: entry ?? './src/index.tsx',
    output: {
      // path: __dirname + '/dist/',
      path: path.resolve(__dirname, outputdir),
    },

    devServer: {
      // IF NOT PRESENT, ROUTERS OTHER THAN ROOT ('/') NOT WORK
      historyApiFallback: true,

      port,
      // open: true,
    },

    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    },

    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(!prod),
        __ENV__: JSON.stringify(env)
      }),
      // new Dotenv({
      //   path: path.join(__dirname, process.env.NODE_ENV === 'production' ? '.env.production' : '.env'),
      //   safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      //   allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      //   systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      //   silent: true, // hide any errors
      //   defaults: false // load '.env.defaults' as the default values if empty.
      // }),
      // new InterpolateHtmlPlugin(process.env),
      new HtmlWebPackPlugin({
        template: 'index.html',
      }),
      new CopyPlugin({
        patterns: copypatterns,
      }),
      new MiniCssExtractPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
          },
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                // Isso força o ts-loader a gerar o código para o Webpack,
                // sobrescrevendo o noEmit do seu tsconfig.json
                noEmit: false
              }
            }
          }
        },

        // CSS normal
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ],
        },

        // SASS
        {
          test: /\.module\.(scss|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  namedExport: false,
                  exportLocalsConvention: 'asIs',
                },
              },
            },
            'sass-loader',
          ],
        },

        // SCSS normal
        {
          test: /\.(scss|sass)$/,
          exclude: /\.module\.(scss|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },

        {
          test: /\.(png|svg|jpe?g|gif)$/,
          loader: 'file-loader',
        }
      ]
    },
  };
}