import path from 'path';
import Promise from 'bluebird';
import fs from 'fs';
import fsTool from './utils/fsTool';
import {
  BUILD_PATH,
  SRC_PATH,
}
from './base.config';

async function exec(ncp, sourceFolder) {
  const ncps = [];
  const targetFolder = `${BUILD_PATH}${path.sep}public${path.sep}images${path.sep}`;
  if (fs.existsSync(sourceFolder)) {
    const stats = fs.statSync(sourceFolder);
    if (stats.isDirectory()) {
      if (!fs.existsSync(targetFolder)) {
          fsTool.makeDir(targetFolder);
      }
      console.log('开始复制文件夹: ' + sourceFolder, ' 到--> ', targetFolder);
      ncps.push(ncp(sourceFolder, targetFolder));
    }
  } else {
    console.error('warning: 没有设置public文件夹,打包不成功!');
  }

  await Promise.all(ncps);
}

async function copy() {
  const ncp = Promise.promisify(require('ncp'));
  try {
    exec(ncp, `${SRC_PATH}${path.sep}public${path.sep}images${path.sep}`);
  } catch (e) {
    console.error('copy error!', e);
  }
}

export default copy;
