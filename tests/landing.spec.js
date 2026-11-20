import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`styles, WebGL and notices survive hydration at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('/');
    await expect(page.locator('#scene canvas')).toHaveCount(1);
    await expect(page.locator('main video')).toHaveCount(0);
    await expect(page.locator('.top')).toHaveCSS('height', '60px');
    await page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('button', { name: '앱 다운로드' }).click();
    await expect(page.locator('#ai-toast')).toHaveText('산들 앱은 출시 준비 중이에요.');
    await expect(page.locator('#ai-toast')).toHaveCSS('visibility', 'visible');
    await page.getByRole('link', { name: 'AI에서 사용하기' }).click();
    await page.getByRole('button', { name: '연결 안내' }).click();
    await expect(page.locator('#ai-toast')).toHaveText('MCP 연결 기능을 준비하고 있어요. 공개 시 연결 방법을 안내할게요.');
    await expect(page.locator('.notification-meta time')).toHaveAttribute('datetime', '12:50');
    await page.getByRole('button', { name: '30분 전', exact: true }).click();
    await expect(page.locator('.notification-meta time')).toHaveAttribute('datetime', '13:50');
    await page.locator('.store-picker summary').click();
    await page.getByRole('button', { name: 'App Store 다운로드 안내', exact: true }).click();
    await expect(page.locator('#ai-toast')).toHaveText('산들 앱은 출시 준비 중이에요.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('the server sends styled content before hydration', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:5175/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('여행 전 산들에서 시작하세요.');
  await expect(page.locator('.top')).toHaveCSS('height', '60px');
  await expect(page.locator('.feature-visual').first()).toHaveCSS('border-top-left-radius', '32px');
  expect(await page.locator('style[data-styled]').count()).toBeGreaterThan(0);
  await context.close();
});

for (const width of [390, 1440]) {
  test(`hero scrolling eases smoothly and settles at ${width}px`, async ({ page }) => {
    // 소프트웨어 렌더러에서는 프레임을 그리는 데 더 오래 걸릴 수 있다.
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    // 앱에 테스트 전용 코드를 추가하지 않고 실제 WebGL 그리기 호출을 센다.
    await page.addInitScript(() => {
      for (const method of ['drawElements', 'drawArrays']) {
        const original = WebGL2RenderingContext.prototype[method];
        WebGL2RenderingContext.prototype[method] = function (...args) {
          this.canvas.__testDrawCount = (this.canvas.__testDrawCount || 0) + 1;
          return original.apply(this, args);
        };
      }
    });
    await page.goto('/');
    await expect(page.locator('#scene canvas')).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    const positions = await page.evaluate(() => {
      const section = document.querySelector('.flight-scroll');
      const stage = document.querySelector('.flight-stage');
      const start = section.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(stage).top);
      return [start + section.offsetHeight - stage.offsetHeight, Math.max(0, start)];
    });
    for (const top of positions) {
      const before = await page.locator('#scene canvas').evaluate(e => e.__testDrawCount || 0);
      const draws = await page.evaluate(async top => {
        window.scrollTo({ top, behavior: 'instant' });
        const frames = count => new Promise(resolve => {
          const tick = () => --count <= 0 ? resolve() : requestAnimationFrame(tick);
          requestAnimationFrame(tick);
        });
        await frames(3);
        const canvas = document.querySelector('#scene canvas');
        const immediate = canvas.__testDrawCount;
        await frames(6);
        const easing = canvas.__testDrawCount;
        await frames(150);
        const settled = canvas.__testDrawCount;
        await frames(12);
        return { immediate, easing, settled, final: canvas.__testDrawCount };
      }, top);
      expect(draws.immediate).toBeGreaterThan(before);
      expect(draws.easing).toBeGreaterThan(draws.immediate);
      expect(draws.final).toBe(draws.settled);
    }
  });
}

for (const width of [390, 1440]) {
  test(`hero wheel stays native without queued page movement at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await expect(page.locator('#scene canvas')).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    const origin = await page.evaluate(() => {
      const section = document.querySelector('.flight-scroll');
      const stage = document.querySelector('.flight-stage');
      const start = section.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(stage).top);
      window.scrollTo({ top: start + (section.offsetHeight - stage.offsetHeight) / 2, behavior: 'instant' });
      window.__scriptScrolls = 0;
      const original = window.scrollTo;
      window.scrollTo = (...args) => { window.__scriptScrolls++; return original.apply(window, args); };
      return scrollY;
    });
    await page.mouse.move(width / 2, 400);
    await page.mouse.wheel(0, 240);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(origin + 240, 0);
    await page.waitForTimeout(350);
    expect(await page.evaluate(() => scrollY)).toBeCloseTo(origin + 240, 0);
    await page.mouse.wheel(0, -240);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeCloseTo(origin, 0);
    await page.waitForTimeout(350);
    expect(await page.evaluate(() => scrollY)).toBeCloseTo(origin, 0);
    expect(await page.evaluate(() => window.__scriptScrolls)).toBe(0);
  });
}

test('reduced-motion users keep native wheel scrolling', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#scene canvas')).toHaveCount(1);
  const end = await page.evaluate(() => {
    const section = document.querySelector('.flight-scroll');
    return section.getBoundingClientRect().bottom + scrollY;
  });
  await page.mouse.move(400, 400);
  await page.mouse.wheel(0, 100000);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(end);
});
