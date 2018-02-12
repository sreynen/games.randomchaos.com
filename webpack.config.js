const path = require('path')
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const configFromName = (name) => {
  const plugins = [new ExtractTextPlugin(`${name}.css`)]
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
  return {
    entry: [`./src/apps/${name}.jsx`, `./src/css/${name}.css`],
    resolve: {
      extensions: ['.js', '.jsx'],
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
      filename: `${name}.js`,
      path: path.resolve(__dirname, 'build') + '/js'
    },
    plugins: plugins
  }
}

module.exports = [
  configFromName('pipes')
]
