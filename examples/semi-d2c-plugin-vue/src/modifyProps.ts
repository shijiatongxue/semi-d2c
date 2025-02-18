import { PluginHooks, TreeNode } from '@douyinfe/semi-d2c-typings';
import { omit } from 'lodash';

function transformJsonString(jsonStr: string): string {
  // 第一步：对单引号添加转义符
  let escapedSingleQuotes = jsonStr.replace(/'/g, "\\'");
  // 第二步：将双引号替换为单引号
  let result = escapedSingleQuotes.replace(/"/g, "'");
  return result;
}

const slotToTemplate = (
  node: TreeNode,
  options: Parameters<TreeNode['toTemplate']>[1],
  slotName: string
) => {
  const { generateTemplate } = options;
  const template = generateTemplate(node as any);
  return `
    <template #${slotName}>
      ${template}
    </template>`;
};

function isNode(value: any): boolean {
  return typeof value === 'object' && 'tag' in value;
}

const modifyProps: PluginHooks['modifyProps'] = (args) => {
  const { props = {} } = args;

  const shouldEmitProps = ['className'];
  for (const [key, value] of Object.entries(props)) {
    if (key === 'children') {
      continue;
    }
    switch (true) {
      case isNode(value):
        value.toTemplate = ((node, options) =>
          slotToTemplate(node, options, key)) as TreeNode['toTemplate'];
        if (Array.isArray(props.children)) {
          props.children.unshift(value);
        } else {
          if (isNode(props.children)) {
            props.children = [props.children, value];
          } else {
            props.children = [value];
          }
        }
        shouldEmitProps.push(key);
        break;
      case typeof value !== 'string':
        if (key === 'className') {
          if (value?.label?.includes('styles.')) {
            props['class'] = value?.label?.split('.')[1];
          } else {
            props[':class'] = value;
          }
        } else {
          props[`:${key}`] = typeof value === 'object' ? transformJsonString(JSON.stringify(value)) : `${value}`;
          delete props[key];
        }
        break;
      default:
        if (key === 'className') {
          props['class'] = value;
        }
    }
  }

  const newProps = omit(props, shouldEmitProps);
  return newProps;
};

export default modifyProps;
