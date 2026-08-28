import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(root, '.env') });

const fileKey = process.env.FIGMA_FILE_KEY;
if (!fileKey) {
  console.error(
    'FIGMA_FILE_KEY is not set. Copy .env-example to .env and fill in FIGMA_FILE_KEY ' +
      'with the Design System file\'s key (the id in its figma.com/design/<key>/... URL).'
  );
  process.exit(1);
}

const configPath = path.join(root, 'figma.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

config.codeConnect.documentUrlSubstitutions = {
  ...config.codeConnect.documentUrlSubstitutions,
  '{{DESIGN_SYSTEM_FILE_KEY}}': fileKey,
};

const outPath = path.join(root, '.figma.config.generated.json');
fs.writeFileSync(outPath, JSON.stringify(config, null, 2) + '\n');
console.log(`Generated ${path.basename(outPath)} with DESIGN_SYSTEM_FILE_KEY=${fileKey}`);
