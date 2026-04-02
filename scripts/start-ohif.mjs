import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync, spawn } from 'node:child_process';
import { loadRootEnv } from './load-env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
loadRootEnv(rootDir);

const viewersDir = resolve(rootDir, 'ohif-app', 'Viewers');
const bootstrap = resolve(rootDir, 'scripts', 'bootstrap-ohif.mjs');

function runBlocking(cmd, args, cwd, env = process.env) {
  const res = spawnSync(cmd, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env,
  });
  if (res.status !== 0) process.exit(res.status || 1);
}

runBlocking(process.execPath, [bootstrap], rootDir, process.env);

const env = {
  ...process.env,
  HOST: process.env.OHIF_HOST || '0.0.0.0',
  PORT: process.env.OHIF_PORT || '3001',
  APP_CONFIG: process.env.OHIF_APP_CONFIG || 'config/dicomweb-server.js',
  PROXY_TARGET: process.env.OHIF_PROXY_TARGET || '/dicomweb',
  PROXY_DOMAIN: process.env.DCM4CHEE_BASE_URL || 'http://localhost:8080/dcm4chee-arc',
  ROUTER_BASENAME: process.env.OHIF_ROUTER_BASENAME || '/viewer',
  PUBLIC_URL: process.env.OHIF_PUBLIC_URL || '/viewer/',
  BROWSER: 'none',
};

console.log('\n[start-ohif] Starting OHIF (yarn dev) ...');
console.log(`  HOST=${env.HOST}`);
console.log(`  PORT=${env.PORT}`);
console.log(`  APP_CONFIG=${env.APP_CONFIG}`);
console.log(`  PROXY_TARGET=${env.PROXY_TARGET}`);
console.log(`  PROXY_DOMAIN=${env.PROXY_DOMAIN}`);
console.log(`  ROUTER_BASENAME=${env.ROUTER_BASENAME}`);
console.log(`  PUBLIC_URL=${env.PUBLIC_URL}\n`);

const child = spawn('yarn', ['dev'], {
  cwd: viewersDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env,
});

child.on('exit', code => process.exit(code || 0));
