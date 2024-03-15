import { PluginHooks } from '@douyinfe/semi-d2c-typings';

export const generateTemplateFile: PluginHooks['generateTemplateFile'] = (
  args
) => {
  const { code, utils } = args;
  const { template, imports } = code;
  const { getImportsString } = utils;

  console.log('template', template);

  return `import React from 'react';
${getImportsString(imports)}

const Component = () => {
  return (
  ${template}
  );
}
export default Component;
`;
};
