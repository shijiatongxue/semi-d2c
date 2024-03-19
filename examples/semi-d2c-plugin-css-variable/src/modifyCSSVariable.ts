import { PluginHooks } from '@douyinfe/semi-d2c-typings';

const modifyCSSVariable = (
  args: Parameters<PluginHooks['modifyCSSVariable']>[0],
  options: Record<string, any>
) => {
  const { variable, codeSyntax } = args;
  const { platform } = options;

  // 如果在 Figma 中已定义 codeSyntax，则返回对应平台的 css variable
  if (platform in codeSyntax) {
    // 可以返回一个对象，完全控制生成的 css value，
    return {
      type: 'value',
      value: codeSyntax[platform],
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
