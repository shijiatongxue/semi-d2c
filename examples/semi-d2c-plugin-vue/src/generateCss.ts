import { TreeNode, PluginHooks, PluginAPI } from '@douyinfe/semi-d2c-typings';
import { kebabCase, upperFirst } from 'lodash';

const generateCSS = (
  args: Parameters<PluginHooks['generateCSS']>[0],
  utils: PluginAPI['utils']
) => {
  const { JSONSchema, sizeUnitConfig } = args;
  const {
    traverseNodeTree,
    getNodeClassName,
    transformStyleToCSSDeclarationBlock,
  } = utils;
  let cssStr = '';

  const classNameSet: Set<string> = new Set();
  traverseNodeTree(JSONSchema, (node: TreeNode) => {
    const { style } = node;
    if (!style) {
      return;
    }

    const className = getNodeClassName(node, {
      classNameSet,
      caseStyle: 'kebabCase',
    });
    node.className = className;
    const declBlock = transformStyleToCSSDeclarationBlock(style, {
      sizeUnitConfig,
      modifyCSSDeclaration: (key: string, value: string) => {
        const newKey = getCSSAttrKey(key);
        return {
          key: newKey,
          value,
        };
      },
    });
    cssStr += `.${className} ${declBlock}`;
  });

  return cssStr;
};

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
