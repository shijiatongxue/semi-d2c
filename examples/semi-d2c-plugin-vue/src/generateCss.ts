import { TreeNode, PluginHooks, PluginAPI } from '@douyinfe/semi-d2c-typings';
import { kebabCase, upperFirst } from 'lodash';
import { hooks } from './utils';

const generateCSS = (
  args: Parameters<PluginHooks['generateCSS']>[0],
  utils: PluginAPI['utils']
) => {
  const { JSONSchema } = args;
  const { traverseNodeTree } = utils;
  let cssStr = '';

  const classNameSet = new Set();
  traverseNodeTree(JSONSchema, (node: TreeNode) => {
    let { className } = node;
    const { style } = node;

    if (className && style) {
      if (classNameSet.has(className)) {
        for (let i = 1; ; i++) {
          const newClassName = `${className}${i}`;
          if (!classNameSet.has(newClassName)) {
            className = newClassName;
            break;
          }
        }
      }
      classNameSet.add(className);
      className = kebabCase(className);
      node.className = className;
      const classKey = `.${className}`;
      const newStyle = initStyle(style);
      const classValue = Object.keys(newStyle)
        .map((key) => {
          const value = newStyle[key];
          return `${getCSSAttrKey(key)}: ${value}`;
        })
        .join(';');

      cssStr += `${classKey} { ${classValue} };\n`;
    }
  });

  return cssStr;
};

function initStyle(style) {
  hooks.forEach((hook) => {
    hook(style);
  });

  return style;
}

function getCSSAttrKey(reactStylePropKey) {
  const isFirstCharUppercase =
    upperFirst(reactStylePropKey) === reactStylePropKey;
  if (reactStylePropKey.startsWith('ms') || isFirstCharUppercase) {
    return `-${kebabCase(reactStylePropKey)}`;
  } else {
    return kebabCase(reactStylePropKey);
  }
}

export default generateCSS;
