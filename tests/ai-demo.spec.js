import { test, expect } from '@playwright/test';

// The AI section is not rendered on the simplified page (kept on disk for later).
test.skip('AI preview gives one explicit sample answer per page and prevents repeated requests', async ({ page }) => {
  await page.goto('/');
  const demo = page.locator('#ai-preview');
  const input = demo.getByRole('textbox', { name: '공항 정보 질문' });
  const send = demo.getByRole('button', { name: '질문 보내기' });
  await expect(send).toBeDisabled();
  await input.fill('   ');
  await expect(send).toBeDisabled();
  await input.fill('김해에서 제주까지 얼마나 걸려? 주차도 알려줘');
  await input.press('Enter');
  await expect(demo.locator('.demo-answer')).toContainText('운항정보 예시');
  await expect(demo.locator('.demo-answer')).toContainText('1시간');
  await expect(demo.locator('.demo-answer')).toContainText('주차 안내 예시');
  await expect(demo.locator('.demo-answer')).toContainText('실제 조회 결과가 아닌');
  await expect(send).toBeDisabled();
  await expect(input).toBeDisabled();
  await expect(demo.getByRole('button', { name: '공항 혼잡도', exact: true })).toBeDisabled();
  await page.reload();
  await input.fill('인천공항 비행기 알려줘');
  await send.click();
  await expect(demo.locator('.demo-answer')).toContainText('김해공항의 고정 예시만');
  await expect(demo.locator('.demo-result')).toHaveCount(0);
  await page.reload();
  await input.fill('안녕하세요');
  await send.click();
  await expect(demo.locator('.demo-answer')).toContainText('실제 AI 응답은 제공하지 않아요');
});
