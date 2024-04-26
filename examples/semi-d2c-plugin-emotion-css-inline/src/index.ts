import { generateTemplateFile } from './generateTemplateFile';
import modifyProps from './modifyProps';
import modifySandboxFiles from './modifySandboxFiles';

// 参数options，为插件配置选项
export const semiD2CPlugin = () => ({
  name: 'Semi @emotion/css inline plugin',

  setup(api) {
    console.log('Semi @emotion/css inline plugin');
    api.modifyProps(modifyProps);
    api.modifySandboxFiles(modifySandboxFiles);
    api.generateTemplateFile((arg) => generateTemplateFile(arg, api));
  },
});
