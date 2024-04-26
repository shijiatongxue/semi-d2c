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
      // 避免出现 style 有值，但转为 styleStr 后没有值问题，比如有些是默认值会去掉
      if (styleStr?.trim().length === 0) {
        delete node.props.className;
        return;
      }
      const className = `css\`${styleStr.trim()}\``;
      const classNameVariable = createVariable(className);
      const newProps = { ...props, className: classNameVariable };
      return newProps;
    }
  }
}
