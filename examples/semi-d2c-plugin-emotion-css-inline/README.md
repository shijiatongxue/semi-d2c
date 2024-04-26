# semi-d2c-plugin-emotion-css-inline

emotion css 内嵌写法，需同时开启 emotion 出码后使用。

![alt text](enable-emotion.png)

## 开启此插件后

样式内联到 className prop。

![alt text](after.png)

## 开启此插件前

开启插件 `semi-d2c-plugin-emotion-css-inline` 前，emotion 样式默认拆分到 `style.js` 文件。

| component.js             | style.js                 |
| ------------------------ | ------------------------ |
| ![alt text](before1.png) | ![alt text](before2.png) |

# 如何创建自己的转码插件？

```bash
# 社区用户
mkdir semi-d2c-plugin && cd semi-d2c-plugin
npm init @douyinfe/semi-d2c-plugin

# 字节内网用户
mkdir semi-d2c-plugin && cd semi-d2c-plugin
npm init @ies/semi-d2c-plugin-starter
```
