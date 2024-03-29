import inspectDraft from './inspectDraft';
import type { SemiD2CPlugin } from '@douyinfe/semi-d2c-typings';

export const semiD2CPlugin: SemiD2CPlugin = () => ({
  name: 'Semi D2C 示例插件',
  options: [],

  setup(api) {
    api.inspectDraft((nodeTree) => inspectDraft(nodeTree, api.utils));
  },
});
