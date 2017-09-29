import run from './run';

async function build() {
  await run(require('./clean'));
  await run(require('./MakeCssFile'));
  await run(require('./BundleCss'));
  await run(require('./CopyFileForRelease'));
}

export default build;

