#! /usr/bin/env node

import { fileURLToPath } from 'url';
import os from 'os';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { set } from '../lib/env-file.js';

const __dirname = fileURLToPath(path.dirname(import.meta.url));

const envFilePath = path.join(__dirname, '../..', '.env');
const tmpFilePath = path.join(os.tmpdir(), 'secret-key');
exec(`npx @fastify/secure-session > ${tmpFilePath}`, async (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }

  const keyBuffer = await fs.readFile(tmpFilePath);
  const hexString = keyBuffer.toString('hex');
  let text;
  try {
    text = await fs.readFile(envFilePath, 'utf-8');
  } catch {
    text = '';
  }
  await fs.writeFile(envFilePath, set(text, 'SESSION_KEY', hexString));
  await fs.unlink(tmpFilePath);
});
