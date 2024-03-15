import { PluginHooks, TreeNode } from '@douyinfe/semi-d2c-typings';

export const modifyJSONSchema: PluginHooks['modifyJSONSchema'] = (node) => {
  const root = node.children[0];

  const formNode = {
    name: 'Form',
    tag: 'Form',
    type: 'INSTANCE',
    packageName: '@ecom/auxo',
    componentName: 'Form',
    props: {
      children: root,
    },
    children: [root],
  } as unknown as TreeNode;

  node.children = [formNode];
  return node;
};
