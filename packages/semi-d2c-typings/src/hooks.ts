import {
  D2CInspect,
  GlobalSetting,
  ImportsType,
  SandboxParams,
  TreeNode,
} from './core';

export type PluginHooks = {
  /**
   * 修改 node
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#PaqAdPO52oazdrxkDkhc7rk4ndg
   */
  modifyJSONSchema: ModifyJSONSchemaPluginHook;
  /**
   * 修改 node.props
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#Q5qBd07e4ofjPPxQlwUcdBcFnsg
   */
  modifyProps: ModifyPropsPluginHook;
  /**
   * 修改 node.style
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#ZYL9dCKP7ooZGPxrTm5c2uxSnvb
   */
  modifyStyle: ModifyStylePluginHook;
  /**
   * 自定义生成 css
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#F1h1dWj5ToVpaAxVZkjcMX1YnGd
   */
  generateCSS: GenerateCSSPluginHook;
  /**
   * 修改 css 文件
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#IiVaduCzdoq6pnxkOTRcN1kYnfd
   */
  modifyCSS: ModifyCSSPluginHook;
  /**
   * 修改 css 变量映射
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#Oo3JdkYmXoxu6Lx8TMBc8aXnnhr
   */
  modifyCSSVariable: ModifyCSSVariablePluginHook;
  /**
   * 自定义整个节点树的 jsx 生成
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#B0eHdoi1SoJUywxQP7pcVT37n3d
   */
  generateTemplate: GenerateTemplatePluginHook;
  /**
   * 自定义 template file，用于将 template, imports 拼接为文件
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#OSUvdZxDwo0tBQxk1MjczJfBnMb
   */
  generateTemplateFile: GenerateTemplateFilePluginHook;
  /**
   * 自定义沙箱文件
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#DDamdxkXCowA1Vx76WjcXdqlnAb
   */
  generateSandboxFiles: GenerateSandboxFilesPluginHook;
  /**
   * 修改沙箱文件
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#GDAidVKCiovoVwxJ8AFc6fWwnDf
   */
  modifySandboxFiles: ModifySandboxFilesPluginHook;
  /**
   * 修改编辑器默认选中的文件
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#FwOhd2tZmoiRnbxmeSOcfMYmn9c
   */
  modifyEditorDefaultActiveFile: ModifyEditorDefaultActiveFilePluginHook;
  /**
   * 修改编辑器默认打开的文件
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#BqWBdBrEdoU4FvxR3JxcjZpHnff
   */
  modifyEditorDefaultOpenFiles: ModifyEditorDefaultOpenFilesPluginHook;
  /**
   * 自定义 code 预览
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#NrYCdiN14oJDcGxroeHc0PRkndH
   */
  codePreview: CodePreviewPluginHook;
  /**
   * 自定义检查设计稿
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#YeBTdhAXdonb8jxiZYIcuJQNnng
   */
  inspectDraft: InspectDraftPluginHook;
  /**
   * 获取自定义 shared plugin data
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#WuWRdZ9j1o5yOvxJFQhcGVgUnze
   */
  getSharedPluginData: GetSharedPluginDataPluginHook;
  /**
   * 修改 css 的继承属性提升行为
   * @see https://bytedance.larkoffice.com/wiki/ViuZwjP9giLLR2kxwMzc8GZMnof#XPkidL81RomSKrxb0doco1sMnR2
   */
  modifyInheritableCSSProps: ModifyInheritableCSSPropsPluginHook;
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
  codeSyntax: {
    WEB?: string;
    ANDROID?: string;
    iOS?: string;
  };
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

export type InspectDraftPluginHook = (treeNode: TreeNode) => D2CInspect[];

export type ModifyInspectsPluginHook = (inspects: D2CInspect[]) => D2CInspect[];

export type GetSharedPluginDataPluginHook = (args: {
  node: {
    /**
     * 实际调用的是 Figma 方法
     * @see https://www.figma.com/plugin-docs/api/PaintStyle/#getsharedplugindata
     */
    getSharedPluginData: (namespace: string, key: string) => string;
  };
}) => Record<string, any>;

export type ModifyInheritableCSSPropsPluginHook = (args: {
  inheritableCSSProps: string[];
  node: TreeNode;
}) => string[];
