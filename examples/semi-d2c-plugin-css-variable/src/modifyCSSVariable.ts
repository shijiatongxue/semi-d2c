import { PluginHooks } from '@douyinfe/semi-d2c-typings';

const modifyCSSVariable: PluginHooks['modifyCSSVariable'] = (args) => {
  const { variable, codeSyntax } = args;
  // 如果在 Figma 中已定义 codeSyntax，则直接返回，这里返回的是 WEB
  // 或根据转码插件所属的框架选择 codeSyntax，比如转码插件框架是 iOS，这里则选择 codeSyntax['iOS']
  if (codeSyntax?.WEB) {
    // 可以返回一个对象，完全控制生成的 css value，
    return {
      type: 'value',
      value: codeSyntax.WEB,
    };
  } else {
    const variableMap = {
      '--颜色-主要': '--color-primary',
      '--颜色-文字-主要': '--color-text-0',
      '--颜色-背景-主要': '--color-bg-0',
    };
    const platteMap = {
      '--蓝色-0': '--color-blue-0',
    };
    if (variable in variableMap) {
      return variableMap[variable];
    } else if (variable in platteMap) {
      return {
        type: 'value',
        value: `rgb(var(${platteMap[variable]}))`,
      };
    }
    // 其他不需要修改，返回 undefined 即可。
    return;
  }
};

export default modifyCSSVariable;
