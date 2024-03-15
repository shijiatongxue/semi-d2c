import {
  codeSandboxTaskJSON,
  devContainerJSON,
  htmlFile,
  indexFile,
  normalizeCSS,
  viteConfigJS,
} from './utils/constants';
import { PluginHooks, SandboxParams } from '@douyinfe/semi-d2c-typings';
import { getDependencies } from './utils';

const generateSandboxFiles: PluginHooks['generateSandboxFiles'] = (args) => {
  const { code } = args;
  const { templateFile, imports } = code;
  const dependencies = getDependencies(imports);
  const sandboxFiles: SandboxParams = {
    title: 'Vue D2C',
    files: {
      ['.codesandbox/tasks.json']: {
        content: codeSandboxTaskJSON,
        isBinary: false,
      },
      ['.devcontainer/devcontainer.json']: {
        content: devContainerJSON,
        isBinary: false,
      },
      ['vite.config.js']: {
        content: viteConfigJS,
        isBinary: false,
      },
      ['src/App.vue']: { content: templateFile, isBinary: false },
      ['src/main.js']: { content: indexFile, isBinary: false },
      ['src/style.css']: { content: normalizeCSS, isBinary: false },
      ['index.html']: { content: htmlFile, isBinary: false },
      ['package.json']: {
        content: JSON.stringify({
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'vue-tsc && vite build',
            preview: 'vite preview',
          },
          dependencies: {
            vue: '^3.4.21',
            ...dependencies,
          },
          devDependencies: {
            '@vitejs/plugin-vue': '^5.0.4',
            sass: '^1.71.1',
            vite: '^5.1.6',
          },
        }),
        isBinary: false,
      },
    },
  };

  return sandboxFiles;
};

export default generateSandboxFiles;
