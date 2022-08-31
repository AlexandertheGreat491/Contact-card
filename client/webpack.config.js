// require statements
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");

const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      title: "Webpack Plugin",
    }),
    new WorkboxPlugin.GenerateSW({
      // images will not be precached
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],

      // defines runtime caching rules
      runtimeCaching: [
        {
          // matches any request that ends with .png, .jpg, jpeg or .svg
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

          // applies a cache-first strategy
          handler: "CacheFirst",

          options: {
            // uses a custom cache name
            cacheName: "images",

            // only caches 1 image
            expiration: {
              maxEntries: 1,
            },
          },
        },
      ],
    }),
  ],
};
