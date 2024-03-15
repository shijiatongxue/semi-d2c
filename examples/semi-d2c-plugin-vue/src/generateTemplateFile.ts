import { APIUtils, PluginHooks } from '@douyinfe/semi-d2c-typings';

export const generateTemplateFile = (
  args: Parameters<PluginHooks['generateTemplateFile']>[0],
  apiUtils: APIUtils
) => {
  const { code, utils } = args;
  const { template, imports, css } = code;
  const { getImportsString } = utils;

  const templateFile = `<template>
  ${template}
</template>

<script setup>
${getImportsString(imports)}
</script>

<style lang="scss" scoped>
  ${css}
</style>
`;

  if (apiUtils?.prettierJS) {
    return apiUtils.prettierJS(templateFile);
  } else {
    return templateFile;
  }
};
