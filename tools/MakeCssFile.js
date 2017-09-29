#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import colors from 'colors';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
});

async function MakeCssFile() {
  const componentsPath = path.join(process.cwd(), 'src', 'components');
  console.log(componentsPath);
  let componentsCSSContent = '';
  const folders = fs.readdirSync(componentsPath);
  folders.forEach(dir => {
    const folderPath = path.join(componentsPath, dir);
    if (!fs.lstatSync(folderPath).isDirectory()) {
      return false;
    }
    const files = fs.readdirSync(folderPath);
    console.log("component folder path:"+folderPath);
    let folderPaths = folderPath.split('/');
    let folderPathsLen = folderPaths.length;
    const filePath = folderPaths[folderPathsLen-1];
    files.forEach(file => {
      if (/\.(css|less)$/i.test(file)) {
        componentsCSSContent += `@import "../../components/${path.join(filePath, file)}";\n`;
      }
    });
    return true;
  });
  console.log(componentsCSSContent);

  fs.writeFileSync(path.join(process.cwd(), 'src', 'public', 'styles','avatar-uix.css'), componentsCSSContent);
}

export default MakeCssFile;
