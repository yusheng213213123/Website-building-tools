const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob-all");
const CopyPlugin = require("copy-webpack-plugin");
const getAllHtmlFiles = () => {
  const htmlAllFiles = glob.sync(["./src/**/*.html"]);
  return htmlAllFiles.map((files) => {
    const filename = files.split("/")[files.split("/").length - 1];
    return new HtmlPlugin({
      template: files,
      filename: (entryPoint) => `${filename}`,
    });
  });
};
const envir = process.env.NODE_ENV;
module.exports = {
  entry: "./main.js",
  output: {
    filename:
      envir == "production" ? "js/[name].[contenthash:10].js" : "js/[name].js",
    chunkFilename:
      envir == "production"
        ? "js/[name].[contenthash:10].chunk.js"
        : "js/[name].chunk.js",
    path: envir == "production" ? path.resolve(__dirname, "dist") : undefined,
    assetModuleFilename: "assets/[contenthash:10][ext][query]",
    clean: envir == "production" ? true : false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          envir == "production" ? MiniCssExtract.loader : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          envir == "production" ? MiniCssExtract.loader : "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|svg|webp|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
        include: path.resolve(__dirname, "./src/js"),
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              // {
              //   tag: "link",
              //   attribute: "href",
              //   type: "src",
              // },
            ],
          },
        },
      },
    ],
  },
  plugins: [
    ...getAllHtmlFiles(),
    envir == "production" &&
      new MiniCssExtract({
        filename: "css/[name].[contenthash:10].css",
        chunkFilename: "css/[name].[contenthash:10].chunk.css",
      }),
    envir == "production" &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./src/static"),
            to: path.resolve(__dirname, "./dist/static"),
            globOptions: {
              ignore: ["**/*.html"],
            },
          },
        ],
      }),
  ].filter(Boolean),
  optimization: {
    minimize: envir == "production",
    minimizer: [
      // css , js压缩
      new CssMinimizer(),
      new TerserPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        library: {
          test: /[\\/]node_modules[\\/](swiper(.*)?|dayjs(.*)?|jquery(.*)?|echarts(.*)?)[\\/]/,
          name: "chunk-library",
          priority: 40,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    // cache
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
  },
  mode: envir == "production" ? "production" : "development",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  devServer: {
    host: "localhost",
    open: true,
    hot: true, // 开启hmr
    port: 3000,
    historyApiFallback: true,
  },
  devtool: envir == "production" ? "source-map" : "cheap-module-source-map",
};
