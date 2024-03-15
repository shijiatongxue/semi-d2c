import { generateTemplateFile } from './generateTemplateFile';
import { modifyJSONSchema } from './modifyJSONSchema';
import type { SemiD2CPlugin } from '@douyinfe/semi-d2c-typings';

export const semiD2CPlugin: SemiD2CPlugin = () => ({
  name: 'Semi D2C 示例插件',
  options: [],

  setup(api) {
    api.generateTemplateFile(generateTemplateFile);
    api.modifyJSONSchema(modifyJSONSchema);
  },
});
