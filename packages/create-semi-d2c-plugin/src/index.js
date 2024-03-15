#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const clc = require('cli-color');
const shelljs = require('shelljs');

function init() {
  const currentPath = process.cwd();
  fs.copySync(path.resolve(__dirname, './template'), currentPath, {
    overwrite: true,
  });
  console.log(clc.green('✔ Semi D2C plugin starter 创建成功~'));
  console.log(clc.green('安装依赖...'));
  shelljs.exec('npm install');
  console.log(clc.green('✔ 依赖安装完成~'));
}

init();
