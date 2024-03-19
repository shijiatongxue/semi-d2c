import modifyCSSVariable from './modifyCSSVariable';
import type { SemiD2CPlugin } from '@douyinfe/semi-d2c-typings';

export const semiD2CPlugin: SemiD2CPlugin = () => ({
  name: 'Semi D2C 示例插件',

  // 支持插件参数
  options: [
    {
      name: 'platform',
      type: 'select',
      defaultValue: 'WEB',
      optionList: ['WEB', 'iOS', 'ANDROID'],
    },
  ],

  setup(api, pluginOptions) {
    api.modifyCSSVariable((args) => modifyCSSVariable(args, pluginOptions));
  },
});
