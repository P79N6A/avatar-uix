import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import run from './run';
import webpackConfig from './config/webpack.config.dev';

global.WATCH = true;
global.HOT = true;
global.DEBUG = true;


const bundler = webpack(webpackConfig);


async function start() {
  await run(require('./CopyFileForDebug'));

  browserSync({
    server: {
      baseDir: './example',

      // target: 'localhost:5000',
      // http://webpack.github.io/docs/webpack-dev-middleware.html
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,

          stats: {
            colors: true,
          },

        }),

        webpackHotMiddleware(bundler),
      ],
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
      'src/**/*.css',
      'src/**/*.html',
    ],
  });
}

export default start;
