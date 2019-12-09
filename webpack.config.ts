import path from 'path';
import { Configuration } from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import cssnano from 'cssnano';
import { SERVER_PORT, IS_DEV, WEBPACK_PORT } from './src/server/config';

const convertPathsToAliases = require('convert-tsconfig-paths-to-webpack-aliases').default;
const plugins = [new ManifestPlugin()];

// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// plugins.push(new BundleAnalyzerPlugin());

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config: Configuration = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : false,
  entry: ['core-js', './src/client/Main'],
  output: {
    path: path.join(__dirname, 'dist', 'statics'),
    filename: `[name]-[hash:8]-bundle.js`,
    publicPath: '/statics/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/, nodeModulesPath],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: IS_DEV,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEV,
              plugins: IS_DEV ? [cssnano()] : [],
            },
          },
        ],
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: 'url-loader?limit=10000',
      },
    ],
  },
  devServer: {
    port: WEBPACK_PORT,
    open: false,
    openPage: `http://localhost:${SERVER_PORT}`
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.gql', '.graphql', '.json']
  },
  watchOptions: {
    //IN ORDER TO MAKE WEBPACK POLLING WORK WITH WSL ADD 'WEBPACK__WATCH__USE_POLLING=true' IN .env AT ROOT OF PROJECT
    poll: (JSON.stringify(process.env.WEBPACK__WATCH__USE_POLLING) != null ? true : false),
  },
  plugins,
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};

export default config;
