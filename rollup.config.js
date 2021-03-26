import { nodeResolve } from '@rollup/plugin-node-resolve';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

export default [
  {
    input: 'src/js/main/index.js',
    output: {
      file: 'build/main.js',
      format: 'iife'
    }
  },
  {
    input: 'src/js/sw/index.js',
    output: {
      file: 'build/sw.js',
      format: 'iife'
    },
    plugins: [
      nodeResolve(),
      injectProcessEnv()
    ]
  },
];
