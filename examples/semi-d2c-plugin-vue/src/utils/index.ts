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
