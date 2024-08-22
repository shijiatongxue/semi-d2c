import { TreeNode } from './core';
import type { Options as PrettierOptions } from 'prettier';
import { PluginHooks } from './hooks';

/**
 * 代码定制化插件
 * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof
 */
export type SemiD2CPlugin = () => SemiD2CPluginReturnType;

export type SemiD2CPluginReturnType = {
  name: string;
  setup(
    /** @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#O10bdVxrUon2SxxsiEuctE46nie */
    api: PluginAPI,
    pluginOptions: Record<string, string | boolean>
  ): void;
  /** @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#UJ3VdrLXNouSBOxVlzDcSdFUnCy */
  options?: PluginOption[];
};

export type PluginAPI = {
  [hookName in keyof PluginHooks]: (hook: PluginHooks[hookName]) => void;
} & {
  utils: APIUtils;
  currentUser?: {
    name: string;
    avatar: string;
    email?: string;
  };
};

export type PluginOption = OptionSwitch | OptionSelect | OptionInput;

export interface OptionSelect {
  name: string;
  type: 'select';
  defaultValue?: string;
  optionList?: string[];
}

export interface OptionSwitch {
  name: string;
  type: 'switch';
  defaultValue?: boolean;
}

export interface OptionInput {
  name: string;
  type: 'input';
  defaultValue?: string;
}

export interface APIUtils {
  prettierJS: (script: string, options?: PrettierOptions) => string;
  prettierCSS: (css: string, options?: PrettierOptions) => string;
  /**
   * 遍历节点，可用于生成 template css 或者 imports 过程
   * 遍历逻辑为
   * 1. 如果是 图片节点，不再遍历子节点
   * 2. 如果是 组件节点，遍历 props 中的 图层节点
   * 3. 如果是 普通节点，遍历 children
   * @param node 节点树
   * @param cb 遍历过程中需要做什么，通过回调函数 cb 实现，比如收集 import 信息
   * @param parentNode 当前节点的父节点
   * @returns {void}
   */
  traverseNodeTree: (
    node: TreeNode,
    cb: (node: TreeNode, parentNode: TreeNode | null) => void,
    parentNode?: TreeNode | null
  ) => void;
}

export { PluginHooks };
