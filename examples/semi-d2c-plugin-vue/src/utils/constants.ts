export const normalizeCSS = `/* import normalize css to your project entry file */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}`;

export const viteConfigJS = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
})`;

export const htmlFile = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;

export const indexFile = `import { createApp } from 'vue'
import './style.css';
import App from "./App.vue";

createApp(App).mount('#app')
`;

export const codeSandboxTaskJSON = `{
  // These tasks will run in order when initializing your CodeSandbox project.
  "setupTasks": [
    {
      "name": "Install Dependencies",
      "command": "pnpm install --force"
    }
  ],

  // These tasks can be run from CodeSandbox. Running one will open a log in the app.
  "tasks": {
    "pnpm run dev": {
      "name": "Vite Dev",
      "command": "pnpm run dev",
      "runAtStart": true,
      "preview": {
        "port": 5173
      }
    },
    "install": {
      "name": "install dependencies",
      "command": "pnpm install"
    }
  }
}`;

export const devContainerJSON = `{
  "name": "Devcontainer",
  "image": "ghcr.io/codesandbox/devcontainers/typescript-node:latest"
}`;
