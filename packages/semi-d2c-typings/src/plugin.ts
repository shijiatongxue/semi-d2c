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
  /**
   * 格式化 js 文件内容，首先会使用 prettier.format 格式化，如果报错则使用 html_beautify 格式化，兜底不格式化。
   */
  prettierJS: (script: string, options?: PrettierOptions) => string;
  /**
   * 格式化 css 内容，首先会使用 prettier.format 格式化，如果报错则使用 css_beautify 格式化，兜底不格式化。
   */
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
  /**
   * 拍平节点树。拍平逻辑如下。
   * - 如果是普通节点，提取 children
   * - 如果是组件，提取组件 props 中的 node
   */
  flattenTree: (node: TreeNode) => TreeNode[];
  /**
   * 获取组件 props 中包含的所有 TreeNode 节点。
   */
  getComponentPropsNodes: (root: TreeNode) => TreeNode[];
  /**
   * 输入一个节点，根据 name、tag、type 等信息生成一个 className。
   * - 如果需要不重复，需传入 classNameSet
   * - 如果传入 props.className，则使用它作为 className，同时会受到 caseStyle 影响
   */
  getNodeClassName: (
    node: TreeNode,
    options?: {
      /** 传入可防止类名重复  */
      classNameSet?: Set<string>;
      /** 如果是 __ROOT__ 节点，会优先使用  */
      rootClassName?: string;
      /** 类名的风格，默认小驼峰  */
      caseStyle?: 'camelCase' | 'kebabCase' | 'snakeCase';
      /** 调用了自定义钩子，D2C 内部使用  */
      eventBus?: any;
    }
  ) => string;
  /**
   * 过滤 name 中的现 js 关键字，在生成 emotion css 时有用。
   */
  getSafeVariableName: (name: string) => string;
  /**
   * 将 node style 转为 css style 或 react 内联样式
   */
  transformStyleToCSSDeclarationObject: (
    style: TreeNode['style'],
    options?: TransformStyleToCSSDeclarationObjectOptions
  ) => Record<string, any>;
  /**
   * 将 node style 换为 [css declaration block](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Syntax#css_declaration_blocks)
   */
  transformStyleToCSSDeclarationBlock: (
    style: TreeNode['style'],
    options?: TransformStyleToCSSDeclarationObjectOptions
  ) => Record<string, any>;
  transformStyleToTailwind: (
    style?: TreeNode['style'],
    options?: {
      tailwindConfig?: TailwindConfig;
    }
  ) => string;
}

export interface TailwindConfig {
  /**
   * @see https://bytedance.larkoffice.com/wiki/IistwQEUxiFaVkkplrLcV3Utngb
   */
  config?: string | Record<string, any>;
  variables?: string;
  rootFontSize?: number;
}

export interface TransformStyleToCSSDeclarationObjectOptions {
  /**
   * css key 的格式，默认为 css
   *
   * ```
   * { 'background-color': 'red', 'padding-left': '2px' }
   * ```
   *
   * 如需在 react style 中使用，设置为 react
   * ```
   * { backgroundColor: 'red', paddingLeft: '2px' }
   * ```
   */
  keyFormat?: 'css' | 'react';
  /**
   * 允许传入自定义函数，修改返回的 key 和 value 的格式
   */
  modifyCSSDeclaration?: ModifyCSSDeclaration;
}

export type ModifyCSSDeclaration = (
  key: string,
  value: string
) => { key: string; value: string };

export { PluginHooks };
