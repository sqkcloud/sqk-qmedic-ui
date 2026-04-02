import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { loadRootEnv } from './load-env.mjs';

const rootDir = process.cwd();
loadRootEnv(rootDir);
const hasBuild = existsSync(resolve(rootDir, '.next'));
const child = spawn('next', hasBuild ? ['start', '-p', '3000'] : ['dev', '-p', '3000'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
});
child.on('exit', code => process.exit(code || 0));
