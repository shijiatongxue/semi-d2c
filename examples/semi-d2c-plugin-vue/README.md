# 如何支持 Vue？

## 目标

D2C 的中间产物是 TreeNode 节点树，我们的目标是把这个节点树转为 Vue 代码，并在此基础上实现代码预览。

> D2C 插件可使用不同的钩子自定义转码的各个过程。更多内容查看 https://semi.design/code/zh-CN/d2c/transform-plugin。

### 了解 TreeNode

TreeNode 主要由 tag、style、props、children 等信息组成。

```ts
export interface TreeNode {
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
}
```

### 了解 Vue 组件

Vue 组件主要包含三个部分：template、style 和 script。

以单文件组件为例。

- template 中是页面 DOM 的描述
- style 中保存 CSS 样式
- script 中包含着 js 代码，如引用。

```html
<script setup>
  import { ref } from 'vue';
  const count = ref(0);
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
  button {
    font-weight: bold;
  }
</style>
```

## 实现

- template 实现：generateTemplate
- style 和 script 实现：generateTemplateFile

### generateTemplate

可使用 generateTemplate 自定义 TreeNode 的转码结果。

### generateTemplateFile

可将 jsx、css、imports 等信息结合起来

至此我们完成了 Vue 模板的生成以及 Vue 组件的生成。

## 预览

D2C 提供了 generateSandboxFiles 钩子，可以将生成的 Vue 组件在 CodeSandbox 预览。

### generateSandboxFiles

通过 CodeSandbox define API 构造符合 SandboxParams，即可完成 CodeSandbox 预览。

如果 CodeSandbox 无法满足需求，也可以通过 codePreview 钩子实现完全的自定义预览功能。

### codePreview

这个钩子输入是产出的代码，可在里面实现完全自定义的转码逻辑。
