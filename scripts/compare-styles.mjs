import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

// 이전 버전에서 record로 기준값을 저장하고 변경 후 compare로 비교한다.
// 비교 결과는 저장소 밖의 디렉터리에 보관한다.
const [mode, directory, baseURL = 'http://127.0.0.1:5174'] = process.argv.slice(2);
if (!['record', 'compare'].includes(mode) || !directory) {
  throw new Error('Usage: node scripts/compare-styles.mjs record|compare /absolute/evidence/path [URL]');
}
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const widths = [390, 800, 801, 1000, 1001, 1100, 1101, 1150, 1151, 1400, 1401, 1440, 1599, 1600];
let differences = [];
try {
  for (const reducedMotion of ['reduce', 'no-preference']) {
    const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion, viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(baseURL);
    await page.evaluate(() => document.fonts.ready);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const key = `${reducedMotion}-${width}`;
      const snapshot = await page.evaluate(() => {
        const elements = [document.documentElement, document.body, ...document.querySelectorAll('body *')]
          .filter(e => !['SCRIPT', 'STYLE', 'LINK', 'NEXT-ROUTE-ANNOUNCER'].includes(e.tagName));
        return elements.map(e => {
          const styles = {};
          for (const pseudo of [null, '::before', '::after']) {
            const computed = getComputedStyle(e, pseudo);
            styles[pseudo || 'element'] = Object.fromEntries(Array.from(computed).map(p => [p, computed.getPropertyValue(p)]));
          }
          return { tag: e.tagName, id: e.id, text: e.children.length ? '' : e.textContent, box: e.getBoundingClientRect().toJSON(), styles };
        });
      });
      const file = path.join(directory, `${key}.json`);
      if (mode === 'record') await writeFile(file, JSON.stringify(snapshot));
      else {
        const previous = JSON.parse(await readFile(file, 'utf8'));
        if (previous.length !== snapshot.length) differences.push({ key, elementCount: [previous.length, snapshot.length] });
        for (let i = 0; i < Math.min(previous.length, snapshot.length); i++) {
          for (const field of ['tag', 'id', 'text', 'box']) {
            if (JSON.stringify(previous[i][field]) !== JSON.stringify(snapshot[i][field])) differences.push({ key, element: i, field, before: previous[i][field], after: snapshot[i][field] });
          }
          for (const pseudo of Object.keys(snapshot[i].styles)) {
            for (const [property, after] of Object.entries(snapshot[i].styles[pseudo])) {
              const before = previous[i].styles[pseudo][property];
              if (before !== after) differences.push({ key, element: i, tag: snapshot[i].tag, pseudo, property, before, after });
            }
          }
        }
      }
      if (reducedMotion === 'reduce' && [390, 1440].includes(width)) {
        const png = await page.screenshot({ fullPage: true });
        const imagePath = path.join(directory, `${key}.png`);
        if (mode === 'record') await writeFile(imagePath, png);
        else {
          await writeFile(path.join(directory, `${key}-after.png`), png);
          if (!png.equals(await readFile(imagePath))) differences.push({ key, screenshot: 'PNG differs' });
        }
      }
      console.log(`${mode}: ${key} (${snapshot.length} elements)`);
    }
    await context.close();
  }
} finally { await browser.close(); }
if (mode === 'compare') {
  await writeFile(path.join(directory, 'differences.json'), JSON.stringify(differences, null, 2));
  console.log(`${differences.length} differences`);
  if (differences.length) { console.log(JSON.stringify(differences.slice(0, 15), null, 2)); process.exitCode = 1; }
}
