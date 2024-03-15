import { generateTemplateFile } from './generateTemplateFile';
import type { SemiD2CPlugin } from '@douyinfe/semi-d2c-typings';
import modifyProps from './modifyProps';
import generateCSS from './generateCss';
import codePreview from './codePreview';
import generateSandboxFiles from './generateSandboxFiles';

/**
 * 插件使用文档
 * https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof
 */
export const semiD2CPlugin: SemiD2CPlugin = () => ({
  name: 'Vue',
  options: [],

  setup(api) {
    // 1. template 节点 props 处理
    api.modifyProps(modifyProps);
    // 2. css 处理
    api.generateCSS((args) => generateCSS(args, api.utils));
    // 3. Vue 单文件组件构造
    api.generateTemplateFile((args) => generateTemplateFile(args, api.utils));
    // 4. 自定义预览
    api.generateSandboxFiles(generateSandboxFiles);
    api.codePreview(codePreview);
    // 5. 修改编辑器 tab 栏默认打开的文件列表
    api.modifyEditorDefaultOpenFiles(() => {
      return ['src/App.vue', 'src/main.js', 'src/style.css'];
    });
    // 6. 修改代码展示区域默认展示的代码文件
    api.modifyEditorDefaultActiveFile(() => {
      return ['src/App.vue'];
    });
  },
});
