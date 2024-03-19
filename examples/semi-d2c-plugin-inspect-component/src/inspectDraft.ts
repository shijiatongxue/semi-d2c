import {
  APIUtils,
  D2CInspect,
  PluginHooks,
  TreeNode,
} from '@douyinfe/semi-d2c-typings';

const inspectDraft = (
  treeNode: Parameters<PluginHooks['inspectDraft']>[0],
  utils: APIUtils
) => {
  const { traverseNodeTree } = utils ?? {};
  const inspects: D2CInspect[] = [];

  const componentsSet: Record<string, TreeNode[]> = {};
  const instancesSet: Record<string, TreeNode[]> = {};

  traverseNodeTree(treeNode, (node) => {
    const { packageName, tag, type, name } = node;
    if (packageName) {
      if (tag in componentsSet) {
        componentsSet[tag].push(node);
      } else {
        componentsSet[tag] = [node];
      }
    } else if (type === 'INSTANCE') {
      if (name in instancesSet) {
        instancesSet[name].push(node);
      } else {
        instancesSet[name] = [node];
      }
    }
  });

  for (const [tag, nodes] of Object.entries(componentsSet)) {
    const componentInspect: D2CInspect = {
      inspectName: '组件',
      inspectType: 'info',
      inspectTitle: tag,
      inspectMessage: '可被转码为组件',
      nodeIds: nodes.map((item) => item.id).filter(Boolean),
      tagName: tag,
    };
    inspects.push(componentInspect);
  }

  for (const [name, nodes] of Object.entries(instancesSet)) {
    const notComponentInspect: D2CInspect = {
      inspectName: '错误组件',
      inspectType: 'warning',
      inspectTitle: name,
      inspectMessage: '无法被转码为组件',
      nodeIds: nodes.map((item) => item.id).filter(Boolean),
      tagName: '无法转码为组件',
    };
    inspects.push(notComponentInspect);
  }

  return inspects;
};

export default inspectDraft;
