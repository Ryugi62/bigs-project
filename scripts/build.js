#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { spawnSync } = require('node:child_process');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('node:path');

 
const nextBin = require.resolve('next/dist/bin/next');
const result = spawnSync('node', [path.resolve(nextBin), 'build', '--webpack'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_DISABLE_TURBOPACK: '1',
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 0);
