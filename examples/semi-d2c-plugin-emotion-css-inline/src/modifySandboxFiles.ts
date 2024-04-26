import { PluginHooks } from '@douyinfe/semi-d2c-typings';

const modifySandboxFiles: PluginHooks['modifySandboxFiles'] = (args) => {
  const { sandboxParams } = args;
  const { files } = sandboxParams;
  if ('style.js' in files) {
    delete files['style.js'];
  }
  return sandboxParams;
};

export default modifySandboxFiles;
