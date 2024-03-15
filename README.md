# semi d2c mono repo

## Dev

- install all

```bash
pnpm install
```

- add package to root

```bash
pnpm add react -w

# add to devDependency
pnpm add @types/node -wD
```

- add package to some package

```bash
pnpm add react --filter <package_selector>
```

- add mono repo A to mono repo B

```bash
pnpm add A --filter B
```

## Publish

- `pnpm changeset version`
- `pnpm install`
- commit
- `pnpm publish -r`
