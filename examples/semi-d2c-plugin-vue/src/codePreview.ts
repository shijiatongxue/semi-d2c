import { PluginHooks } from '@douyinfe/semi-d2c-typings';
import { getParameters } from 'codesandbox/lib/api/define';
import generateSandboxFiles from './generateSandboxFiles';

const CODESANDBOX_DEFINE_URL = 'https://codesandbox.io/api/v1/sandboxes/define';

const codePreview: PluginHooks['codePreview'] = async (options) => {
  const files = generateSandboxFiles(options);
  const params = getParameters(files);

  const res = await fetch(CODESANDBOX_DEFINE_URL, {
    method: 'POST',
    body: `parameters=${params}&json=1&environment=server`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const { sandbox_id: sandboxId } = await res.json();
  const url = `https://codesandbox.io/s/${sandboxId}?file=/src/App.vue`;
  window.open(url, '_blank');
};

export default codePreview;
