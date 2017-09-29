import webpack from 'webpack';
import webpackConfig from './webpack.config';


function BundleCss() {
  return new Promise((resolve, reject) => {
    const bundler = webpack(webpackConfig);
    let bundlerRunCount = 0;

    function onComplete(err) {
      if (err) {
        reject(err);
      }

      if (++bundlerRunCount === (global.WATCH ? webpackConfig.length : 1)) {
        resolve();
      }
    }

    if (global.WATCH) {
      bundler.watch(200, onComplete);
    } else {
      bundler.run(onComplete);
    }
  });
}

export default BundleCss;
