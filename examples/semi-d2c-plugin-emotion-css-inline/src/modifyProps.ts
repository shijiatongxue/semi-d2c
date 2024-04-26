export default function modifyProps(args) {
  const {
    props = {},
    node,
    utils: { createVariable, transpileNodeStyleToCSS },
    enableEmotion,
  } = args;
  if (!enableEmotion) {
    return props;
  } else {
    const { style = {} } = node;
    if (Object.keys(style).length) {
      const styleStr = transpileNodeStyleToCSS(node)
        .replace(/[\n]/g, ' ')
        .replace(/  /g, '');
      const className = `css\`${styleStr.trim()}\``;
      const classNameVariable = createVariable(className);
      const newProps = { ...props, className: classNameVariable };
      return newProps;
    }
  }
}
