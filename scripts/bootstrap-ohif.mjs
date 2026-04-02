import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { loadRootEnv } from './load-env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
loadRootEnv(rootDir);

const viewersDir = resolve(rootDir, 'ohif-app', 'Viewers');
const repoUrl = process.env.OHIF_REPO_URL || 'https://github.com/OHIF/Viewers.git';
const repoRef = process.env.OHIF_REPO_REF || 'master';
const configSource = resolve(rootDir, 'ohif-app', 'config', 'dicomweb-server.js');
const targetConfig = resolve(viewersDir, 'platform', 'app', 'public', 'config', 'dicomweb-server.js');

function run(cmd, args, cwd, env = process.env) {
  const res = spawnSync(cmd, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env,
  });
  if (res.status !== 0) process.exit(res.status || 1);
}

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function replaceInFile(pathname, pairs) {
  if (!existsSync(pathname)) return false;
  let text = readFileSync(pathname, 'utf8');
  const original = text;
  for (const [pattern, replacement] of pairs) {
    text = text.replace(pattern, replacement);
  }
  if (text !== original) {
    writeFileSync(pathname, text, 'utf8');
    return true;
  }
  return false;
}

function patchViewerRepo() {
  const webpackDirs = [
    resolve(viewersDir, 'platform', 'app', '.webpack'),
    resolve(viewersDir, 'platform', 'viewer', '.webpack'),
    resolve(viewersDir, '.webpack'),
  ];

  for (const dir of webpackDirs) {
    if (!existsSync(dir)) continue;
    for (const file of walk(dir)) {
      if (!file.endsWith('.js')) continue;
      replaceInFile(file, [
        [/port:\s*3000\b/g, 'port: Number(process.env.PORT || 3000)'],
        [/port:\s*Number\(process\.env\.PORT \|\| 3000\)\b/g, 'port: Number(process.env.PORT || 3000)'],
        [/host:\s*['"]localhost['"]/g, "host: process.env.HOST || '0.0.0.0'"],
      ]);
    }
  }

  const platformAppPkg = resolve(viewersDir, 'platform', 'app', 'package.json');
  if (existsSync(platformAppPkg)) {
    replaceInFile(platformAppPkg, [
      [/cross-env NODE_ENV=development /g, 'cross-env NODE_ENV=development HOST=$HOST PORT=$PORT PUBLIC_URL=$PUBLIC_URL '],
    ]);
  }
}

if (!existsSync(viewersDir)) {
  mkdirSync(resolve(rootDir, 'ohif-app'), { recursive: true });
  console.log(`\n[bootstrap-ohif] Cloning ${repoUrl} (ref=${repoRef}) into ${viewersDir} ...\n`);
  run('git', ['clone', '--depth', '1', '--branch', repoRef, repoUrl, viewersDir], rootDir);
}

if (!existsSync(resolve(viewersDir, 'node_modules'))) {
  console.log('\n[bootstrap-ohif] Installing OHIF dependencies with yarn...\n');
  run('yarn', ['install'], viewersDir, { ...process.env, CI: process.env.CI || '1' });
}

patchViewerRepo();

if (existsSync(configSource)) {
  mkdirSync(resolve(targetConfig, '..'), { recursive: true });
  const raw = readFileSync(configSource, 'utf8');
  const proxyTarget = process.env.OHIF_PROXY_TARGET || '/dicomweb';
  const routerBasename = process.env.OHIF_ROUTER_BASENAME || '/viewer';
  const aet = process.env.NEXT_PUBLIC_DCM4CHEE_AET || process.env.DCM4CHEE_AET || 'DCM4CHEE';
  const publicUrl = process.env.OHIF_PUBLIC_URL || '/viewer/';
  const rendered = raw
    .replaceAll('__PROXY_TARGET__', proxyTarget)
    .replaceAll('__ROUTER_BASENAME__', routerBasename)
    .replaceAll('__PUBLIC_URL__', publicUrl)
    .replaceAll('__AET__', aet);

  writeFileSync(targetConfig, rendered, 'utf8');
  console.log(`\n[bootstrap-ohif] Rendered + wrote APP_CONFIG -> ${targetConfig}\n`);
}
