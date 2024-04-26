export function generateTemplateFile(args, api) {
  const { code, utils } = args;
  const { template, imports } = code;
  const { getImportsString } = utils;

  let templateFile = `import React from 'react';
${getImportsString(imports)}
import { css } from '@emotion/css';

const Component = () => {
  return (
  ${template}
  );
}
export default Component;
`;
  const {
    utils: { prettierJS },
  } = api;
  templateFile = prettierJS(templateFile);
  return templateFile;
}
