const path = require('path')
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const configFromName = (name, env) => {
  const plugins = [
    new ExtractTextPlugin(`${name}.css`),
    new HtmlWebpackPlugin({
      template: 'html/index.html',
      inject: false,
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: `html/${name}.html`,
      inject: 'body',
      filename: `${name}/index.html`,
      hash: true,
    }),
  ]
  if (
    typeof process.env.nocompress === 'undefined' ||
    process.env.nocompress === ''
  ) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: {
        comments: false,
        ascii_only: true,
        beautify: false,
      },
    }))
  }
  if (typeof env === 'undefined' || !env.production) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  return {
    entry: [`./src/apps/${name}.jsx`, `./src/css/${name}.css`],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      contentBase: path.join(__dirname, "build"),
      disableHostCheck: true,
      host: "0.0.0.0",
      hot: true,
      port: 80,
      progress: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react', 'stage-3'],
            plugins: ['transform-runtime']
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: { importLoaders: 1 },
              },
              'postcss-loader',
            ],
          })
        }
      ]
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router-dom': 'ReactRouterDOM',
      'prop-types': 'PropTypes',
    },
    output: {
      filename: `js/${name}.js`,
      path: path.resolve(__dirname, 'build')
    },
    plugins: plugins
  }
}

module.exports = (env) => ([
  configFromName('pipes', env)
])
