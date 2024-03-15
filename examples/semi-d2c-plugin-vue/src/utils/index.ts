export function getDependencies(imports: Record<string, any>) {
  const importsDependencies = Object.keys(imports).reduce(
    (dependencies: Record<string, string>, packageName: string) => {
      let realPackageName = packageName;
      if (packageName.includes('/')) {
        const isAbsoluteOrRelativePath =
          packageName.startsWith('./') || packageName.startsWith('/');
        // 如果是本地依赖，则不需要加入 sandbox 依赖
        if (isAbsoluteOrRelativePath) {
          return dependencies;
        } else {
          // - scoped packageName: @douyinfe/semi-ui
          // - not scoped packageName: semi-ui
          const isScopedPackage = packageName.startsWith('@');
          const packageNameSplit = packageName.split('/');
          realPackageName = isScopedPackage
            ? packageNameSplit.slice(0, 2).join('/')
            : packageNameSplit.slice(0, 1).join('/');
        }
      }
      dependencies[realPackageName] = 'latest';
      return dependencies;
    },
    {}
  );
  return importsDependencies;
}
function getShortValue(value, type = 'number') {
  let { left = 0, top = 0, right = 0, bottom = 0 } = value;
  const unit = type === 'number' ? 'px' : '';

  if (type === 'number') {
    // 剔除小数
    left = Math.round(Number(left));
    right = Math.round(Number(right));
    top = Math.round(Number(top));
    bottom = Math.round(Number(bottom));
  }

  if (!bottom && !left && !right && !top) {
    return;
  }
  if (left === right && right === top && top === bottom && left) {
    return `${left}${unit}`;
  }

  if (left === right && bottom === top && left !== top) {
    return `${top}${unit} ${left}${unit}`;
  }

  if (top !== bottom && left === right) {
    return `${top}${unit} ${left}${unit} ${bottom}${unit}`;
  }

  return `${top}${unit} ${right}${unit} ${bottom}${unit} ${left}${unit}`;
}

function transpilePadding(style) {
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = style;
  const paddingShort = getShortValue({
    left: paddingLeft,
    right: paddingRight,
    top: paddingTop,
    bottom: paddingBottom,
  });

  delete style.paddingBottom;
  delete style.paddingLeft;
  delete style.paddingRight;
  delete style.paddingTop;
  paddingShort && (style.padding = paddingShort);
}

function transpileMargin(style) {
  const { marginLeft, marginRight, marginTop, marginBottom } = style;
  const marginShort = getShortValue({
    left: marginLeft,
    right: marginRight,
    top: marginTop,
    bottom: marginBottom,
  });

  delete style.marginLeft;
  delete style.marginRight;
  delete style.marginTop;
  delete style.marginBottom;

  marginShort && (style.margin = marginShort);
}

function transpileFont(style) {
  let { fontSize = 0, lineHeight = 0 } = style;
  const { letterSpacing = 0 } = style;

  fontSize = Math.round(Number(fontSize));
  lineHeight = Math.round(Number(lineHeight));

  fontSize && (style.fontSize = `${fontSize}px`);
  lineHeight && (style.lineHeight = `${lineHeight}px`);
  letterSpacing && (style.letterSpacing = `${letterSpacing}px`);
}

function transpileBorderWidth(style) {
  const {
    borderLeftWidth = 0,
    borderRightWidth = 0,
    borderTopWidth = 0,
    borderBottomWidth = 0,
  } = style;

  const borderWidthShort = getShortValue({
    left: borderLeftWidth,
    right: borderRightWidth,
    top: borderTopWidth,
    bottom: borderBottomWidth,
  });

  delete style.borderLeftWidth;
  delete style.borderRightWidth;
  delete style.borderTopWidth;
  delete style.borderBottomWidth;

  borderWidthShort && (style.borderWidth = borderWidthShort);
}

function transpileBorderColor(style) {
  const {
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    borderBottomColor,
  } = style;

  const borderColorShort = getShortValue(
    {
      left: borderLeftColor,
      right: borderRightColor,
      top: borderTopColor,
      bottom: borderBottomColor,
    },
    'string'
  );

  delete style.borderLeftColor;
  delete style.borderRightColor;
  delete style.borderTopColor;
  delete style.borderBottomColor;

  borderColorShort && (style.borderColor = borderColorShort);
}

/**
 * 把 borderWidth、borderColor、borderStyle 合并为 border
 */
function transpileBorder(style) {
  const { borderWidth, borderColor, borderStyle } = style;
  // borderColor 不能识别颜色带空格的情况
  const isAllSingleValue = [borderWidth, borderColor, borderStyle].every(
    (value) => value && !value.includes(' ')
  );
  if (isAllSingleValue) {
    style.border = `${borderWidth} ${borderStyle} ${borderColor}`;
    delete style.borderWidth;
    delete style.borderStyle;
    delete style.borderColor;
  }
}

function transpileBorderRadius(style) {
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = style;

  const borderRadiusShort = getShortValue(
    {
      left: borderBottomLeftRadius,
      right: borderTopRightRadius,
      top: borderTopLeftRadius,
      bottom: borderBottomRightRadius,
    },
    typeof borderBottomLeftRadius
  );

  delete style.borderTopLeftRadius;
  delete style.borderTopRightRadius;
  delete style.borderBottomLeftRadius;
  delete style.borderBottomRightRadius;

  borderRadiusShort && (style.borderRadius = borderRadiusShort);
}

const fontRegex = /[^a-zA-Z-]/;
function transpileFontFamily(style) {
  const { fontFamily } = style;
  if (!fontFamily) {
    return;
  }
  // 如果包含一些其他字符，则使用引号包裹
  if (fontRegex.test(fontFamily)) {
    style.fontFamily = `"${fontFamily}"`;
  }
}

function transpileNumber(style) {
  const keys = [
    'width',
    'minWidth',
    'maxWidth',
    'height',
    'minHeight',
    'maxHeight',
    'columnGap',
    'rowGap',
    'left',
    'right',
    'top',
    'bottom',
    'outlineWidth',
  ];
  for (const key of keys) {
    if (style[key] && typeof style[key] === 'number') {
      style[key] = `${style[key]}px`;
    }
  }
}

/** 使用数组保证运行顺序 */
const hooks = [
  getShortValue,
  transpilePadding,
  transpileMargin,
  transpileFont,
  transpileBorderWidth,
  transpileBorderColor,
  transpileBorder,
  transpileBorderRadius,
  transpileFontFamily,
  transpileNumber,
];

export { hooks };
