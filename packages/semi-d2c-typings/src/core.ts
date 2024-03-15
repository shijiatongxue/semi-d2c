import { PluginHooks } from './plugin';

export interface TreeNode {
  [x: string]: any;
  /** 对应转译后的 HTML 标签名（未来会有 Semi 组件名称），比如 div, p, img, span  */
  tag: string;
  /** 包名，如 @douyinfe/semi-ui、@douyinfe/semi-icons */
  packageName?: string;
  /** 组件是否是默认导出  */
  defaultModule?: boolean;
  /** 对应转译后的 css 样式。key-value 对应 css 属性/值 */
  style: Record<string, any>;
  /** 对应转译后的 HTML 属性（未来会有组件 props），比如 img 标签的 src 属性  */
  props?: Record<string, any>;
  /** 在 figma 画布上的子节点 */
  children?: TreeNode[];
  /** 节点依赖的npm组件或本地组件 */
  dependencies: Array<Dependency>;
  /** 对应节点的图层名称 */
  name: string;
  /** 对应节点的原始 figma TYPE，例如 INSTANCE、FRAME 等 @see https://www.figma.com/plugin-docs/api/nodes/  */
  type: string;
  /** 文本节点传文本内容  */
  text?: string;
  /** 图片节点传图片 URL  */
  asset?: string;
  /** node id */
  id?: string;
  /** 自定义的转码函数 */
  toTemplate?: ToTemplate;
  /** 是否是 d2c node  */
  __semi_d2c_node__?: boolean;
}

export interface Dependency {
  componentName: string;
  packageName: string;
  defaultModule: boolean; // 是否是默认导入，默认是 false
}

export type ToTemplate = (
  target: TreeNode,
  options: { generateTemplate: PluginHooks['generateTemplate'] }
) => string;

export type TransformMode = 'jsx+scss' | 'jsx+tailwind' | 'jsx+emotion';

export type GlobalSetting = {
  transformMode: TransformMode;
};

export type ImportsType = Record<
  string,
  Array<{ name: string; defaultModule?: boolean }>
>;

/**
 * @see https://codesandbox.io/docs/learn/sandboxes/cli-api#define-api
 */
export interface SandboxParams {
  files: Record<string, { content: string; isBinary: boolean }>;
  title?: string;
  description?: string;
  /**
   * @see https://github.com/codesandbox/codesandbox-importers/blob/master/packages/import-utils/src/create-sandbox/templates.ts
   */
  template?:
    | '@dojo/cli-create-app'
    | 'angular-cli'
    | 'create-react-app'
    | 'cxjs'
    | 'docusaurus'
    | 'parcel'
    | 'preact-cli'
    | 'reason'
    | 'static'
    | 'svelte'
    | 'vue-cli';
}
