// rollup.config.js
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  /* your config */
  input: 'src/index.ts',
  plugins: [
    typescript({ skipLibCheck: true }),
    resolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    isProduction && terser(),
  ],
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'plugin',
  },
});
