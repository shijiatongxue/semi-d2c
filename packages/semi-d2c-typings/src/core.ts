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

export interface D2CInspect {
  /** 提示名，如 semiComponent  */
  inspectName: string;
  /** 中文提示名 */
  inspectChineseName?: string;
  /** 提示名的解释，用于解释这个类型提示的作用  */
  inspectDescription?: string;
  /** 提示类型，如 error  */
  inspectType: 'info' | 'warning' | 'error';
  /** 提示标题，可传 node.name 或 node.name 拼接的字符串 */
  inspectTitle: string;
  /** 提示的详细内容，如不知道写什么，可以与 inspectDescription 一致 */
  inspectMessage: string;
  /**
   * 被检查的节点 id 们，id 不能为空
   * 可传单个 id，也可以传多个 id，多个 id 会被作为一次检查结果
   */
  nodeIds: string[];
  /** 检查文档  */
  docURL?: string;
  /** 示意图 */
  imgURL?: string;
  /** 是否默认展示 inspect 线框  */
  defaultVisible?: boolean;
  /** inspect 线框颜色 */
  color?: string;
}
