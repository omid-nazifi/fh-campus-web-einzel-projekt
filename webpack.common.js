const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  // 1
  // Use the src/scripts/index.js file as entry point to bundle it.
  // If the src/scripts/index.js file imports other JS files,
  // bundle them as well
  entry: {
    index: path.resolve(__dirname, './src/scripts/index.js'),
    users: path.resolve(__dirname, './src/scripts/users.js'),
    contact: path.resolve(__dirname, './src/scripts/contact.js'),
  },
  // 2
  // The bundles source code files shall result in a bundle.js file
  // in the /dist folder
  output: {
    path: path.resolve(__dirname, './dist'),
    clean: true,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map'
  },
  // 3
  // The /dist folder will be used to serve our application
  // to the browser
  devServer: {
    static: path.resolve(__dirname, './dist'),
  },
  // 4
  // Add plugins for webpack here
  plugins: [
    new CleanWebpackPlugin,
    new HtmlWebpackPlugin({
      title: "Basic Single Project",
      filename: "index.html",
      template: path.resolve(__dirname, './src/html/index.html'),
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: "User list",
      filename: "users.html",
      template: path.resolve(__dirname, './src/html/users.html'),
      chunks: ['users'],
    }),
    new HtmlWebpackPlugin({
      title: "About Us",
      filename: "about.html",
      template: path.resolve(__dirname, './src/html/about.html'),
      chunks: ['contact'],
    }),
    new HtmlWebpackPlugin({
      title: "Pricing",
      filename: "pricing.html",
      template: path.resolve(__dirname, './src/html/pricing.html'),
      chunks: ['index'],
    }),
    new FaviconsWebpackPlugin(path.resolve(__dirname, './src/assets/favicon.ico'))
  ],
  // 5 
  // Integrate Babel in the build process
  // Define which files to use the loader
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/, // files to exclude
        use: ['babel-loader', 'eslint-loader']
      },
      // CSS and SASS
      {
        test: /\.(scss|css)$/,  // load files that end with scss and css
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // images
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
          },
        },
      }
    ]
  },
  resolve: {
    // options for resolving module requests
    extensions: ['*', '.js']  // files to load
  }
};
