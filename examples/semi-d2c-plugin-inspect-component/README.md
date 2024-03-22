# semi-d2c-plugin-inspect-component

一个 Semi D2C 插件，可检查设计稿中可被转码为组件节点、提醒无法被转码为组件的节点。

[![Watch the video](https://github.com/shijiatongxue/semi-d2c/assets/26477537/0efb8321-9590-4c88-b23c-b67782318b1d)](https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/d2c_doc/inspect-component.mp4)


## 实现

### 组件的判断方式

node 存在 packageName，我们则认为该节点是一个组件节点。

除此之外，你也可以通过 node.tag 判断是否为一个普通的 html 标签。

D2C 目前包含的 html 标签有 div、span、p、img，其他类型则为组件类型。比如 node.tag 为 Button，我们则判断该节点是一个 Button 组件，同时 node.packageName 会保存组件所属的 npm 包名。

### 非组件的判断方式

通过 node.type 为 INSTANCE，且不存在 packageName 判断为无法转码的组件。

[INSTANCE](https://www.figma.com/plugin-docs/api/InstanceNode/) 为 Figma 中的实例节点，此方法可判断未解绑的组件。如果实例节点已解绑，则无法判断出来。

> 此方法有一定的局限性，可根据实际业务综合判断一个节点是否为无法转码的组件

# 如何创建自己的转码插件？

```bash
# 社区用户
mkdir semi-d2c-plugin && cd semi-d2c-plugin
npm init @douyinfe/semi-d2c-plugin

# 字节内网用户
mkdir semi-d2c-plugin && cd semi-d2c-plugin
npm init @ies/semi-d2c-plugin-starter
```
