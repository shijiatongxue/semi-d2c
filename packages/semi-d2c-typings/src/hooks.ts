import { GlobalSetting, ImportsType, SandboxParams, TreeNode } from './core';

export type PluginHooks = {
  modifyJSONSchema: ModifyJSONSchemaPluginHook;
  modifyProps: ModifyPropsPluginHook;
  modifyStyle: ModifyStylePluginHook;
  generateCSS: GenerateCSSPluginHook;
  modifyCSS: ModifyCSSPluginHook;
  modifyCSSValue: ModifyCSSValuePluginHook;
  modifyCSSVariable: ModifyCSSVariablePluginHook;
  generateTemplate: GenerateTemplatePluginHook;
  generateTemplateFile: GenerateTemplateFilePluginHook;
  generateSandboxFiles: GenerateSandboxFilesPluginHook;
  modifySandboxFiles: ModifySandboxFilesPluginHook;
  modifyEditorDefaultActiveFile: ModifyEditorDefaultActiveFilePluginHook;
  modifyEditorDefaultOpenFiles: ModifyEditorDefaultOpenFilesPluginHook;
  codePreview: CodePreviewPluginHook;
};

export type ModifyJSONSchemaPluginHook = (rootNodeTree: TreeNode) => TreeNode;

export type GenerateCSSPluginHook = (args: {
  JSONSchema: TreeNode;
  enableTailwind: boolean;
  enableInlineCSS: boolean;
  enableEmotion: boolean;
}) => string;

export type ModifyCSSPluginHook = (args: {
  css: string;
  JSONSchema: TreeNode;
  enableTailwind: boolean;
  enableInlineCSS: boolean;
  enableEmotion: boolean;
}) => string;

export type GenerateTemplatePluginHook = (args: {
  nodeTree: TreeNode;
  globalSettings: GlobalSetting;
}) => string;

export type GenerateTemplateFilePluginHook = (args: {
  code: {
    template: string;
    css: string;
    imports: ImportsType;
  };
  nodeTree: TreeNode;
  globalSettings: GlobalSetting;
  utils: {
    /** 用于得到 imports 字符串 */
    getImportsString: (imports: ImportsType) => string;
    /** 将prop value 转换为字符串，如果包含节点支持转换为jsx */
    convertPropToString: (prop: { value: any }) => string;
  };
}) => string;

export type GenerateSandboxFilesPluginHook = (args: {
  code: {
    templateFile: string;
    css: string;
    imports: ImportsType;
  };
  globalSettings: GlobalSetting;
}) => SandboxParams;

export type ModifyPropsPluginHook = (args: {
  /** 当前节点 props 的拷贝 */
  props: Record<string, any>;
  /** 当前节点 */
  node: TreeNode;
  utils: {
    /** 工具方法，创建一个变量 */
    createVariable: (str: string) => string;
    /** node.style 转成的 css 字符串 */
    transpileNodeStyleToCSS: (node: TreeNode) => string;
  };
  enableTailwind: boolean;
  enableEmotion: boolean;
}) => Record<string, any>;

export type ModifyStylePluginHook = (args: {
  /**
   * node.style 的克隆
   * 挂载了节点上的 css 样式，{ color: 'red', width: xxx }
   */
  style: TreeNode['style'];
  node: TreeNode;
}) => TreeNode['style'];

export type ModifyCSSVariablePluginHook = (args: {
  variable: string;
  defaultValue: string;
}) => string | { type: 'name' | 'value'; value: string } | undefined;

export type ModifySandboxFilesPluginHook = (args: {
  sandboxParams: SandboxParams;
  globalSettings: GlobalSetting;
}) => SandboxParams;

export type ModifyEditorDefaultActiveFilePluginHook = (options: {
  defaultActiveFile: string[];
}) => string[];

export type ModifyEditorDefaultOpenFilesPluginHook = (options: {
  defaultOpenFiles: string[];
}) => string[];

export type CodePreviewPluginHook = (options: {
  code: {
    templateFile: string;
    css: string;
    imports: ImportsType;
  };
  globalSettings: GlobalSetting;
}) => void;

export type ModifyCSSValuePluginHook = (options: {
  key: string;
  value: string;
}) => void;
