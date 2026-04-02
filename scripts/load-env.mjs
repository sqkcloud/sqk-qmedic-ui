import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function parseEnvText(text) {
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

export function loadRootEnv(rootDir) {
  const files = ['.env.local', '.env'];
  for (const file of files) {
    const full = resolve(rootDir, file);
    if (!existsSync(full)) continue;
    const parsed = parseEnvText(readFileSync(full, 'utf8'));
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] == null || process.env[key] === '') {
        process.env[key] = value;
      }
    }
  }
  return process.env;
}
