import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require=createRequire(import.meta.url);
const result=spawnSync(process.execPath,[require.resolve('next/dist/bin/next'),'build'],{stdio:'inherit',env:{...process.env,GITHUB_PAGES:'true'}});
if(result.status===0)writeFileSync('.next-pages/.nojekyll','');
process.exit(result.status??1);
