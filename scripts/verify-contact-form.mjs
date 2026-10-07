import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The service is mocked: this check never sends email or client data externally.
const url = process.env.CONTACT_TEST_URL || 'http://127.0.0.1:3002/portfolio-website/contact/';
const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const runtimeErrors = [];
page.on('pageerror', error => runtimeErrors.push(error.message));
let serviceRequests = [];
let reply = { success: 'true', message: 'The form was submitted successfully.' };
let httpStatus = 200;
let networkFailure = false;
let release;
await context.route('**/*', async route => {
  const request = route.request();
  const target = new URL(request.url());
  if (target.hostname === '127.0.0.1') return route.continue();
  if (target.origin !== 'https://formsubmit.co' || !target.pathname.startsWith('/ajax/')) {
    throw new Error(`Unexpected external request: ${target.origin}`);
  }
  serviceRequests.push({ url: request.url(), body: request.postDataJSON() });
  if (release) await new Promise(resolve => { release = resolve; });
  if (networkFailure) return route.abort('failed');
  return route.fulfill({ status: httpStatus, contentType: 'application/json', body: JSON.stringify(reply) });
});

async function fill() {
  await page.getByLabel('Your name', { exact: true }).fill('Local test client');
  await page.getByLabel('Email address', { exact: true }).fill('client@example.invalid');
  await page.getByLabel('Company or team').fill('Test company');
  await page.getByLabel('What do you need?').selectOption('API or integration');
  await page.getByLabel('Tell me about the work').fill('This is a local mocked enquiry.');
}

try {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  assert.equal(serviceRequests.length, 0, 'Required fields prevent empty submissions');
  await fill();
  release = true;
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await page.getByRole('button', { name: 'Sending…' }).waitFor();
  assert.equal(await page.getByLabel('Your name', { exact: true }).isDisabled(), true);
  await expect.poll(() => serviceRequests.length).toBe(1);
  const request = serviceRequests[0];
  assert.equal(request.url, 'https://formsubmit.co/ajax/adjetadjetey45@gmail.com');
  assert.equal(request.body._replyto, 'client@example.invalid');
  assert.equal(request.body.project, 'API or integration');
  assert.equal(request.body.company, 'Test company');
  assert.equal(request.body._url, url);
  assert.equal(request.body._subject, 'Portfolio enquiry from Local test client');
  const resolve = release; release = null; resolve();
  await page.getByRole('status').filter({ hasText: 'Thank you' }).waitFor();
  assert.equal(await page.getByLabel('Your name', { exact: true }).inputValue(), '');
  console.log('PASS validation, sending lock, destination, payload, Reply-To and successful reset');

  for (const scenario of ['activation', 'rejected', 'network']) {
    await fill();
    reply = scenario === 'activation'
      ? { success: 'true', message: "This form needs Activation. We've sent you an email containing an Activate Form link." }
      : { success: false, message: 'Submission refused' };
    httpStatus = scenario === 'rejected' ? 429 : 200;
    networkFailure = scenario === 'network';
    await page.getByRole('button', { name: 'Send enquiry' }).click();
    await page.locator('.form-status-error').waitFor();
    assert.equal(await page.getByLabel('Your name', { exact: true }).inputValue(), 'Local test client');
    assert.equal(await page.getByLabel('Tell me about the work').inputValue(), 'This is a local mocked enquiry.');
    assert.equal(await page.locator('.form-email-fallback').getAttribute('href'), 'mailto:adjetadjetey45@gmail.com');
    assert.equal(await page.getByRole('button', { name: 'Send enquiry' }).isEnabled(), true);
    if (scenario === 'activation') assert.match(await page.getByRole('status').innerText(), /awaiting email verification/);
    console.log(`PASS ${scenario}: no false success, values retained, retry enabled and direct-email fallback`);
  }
  const before = serviceRequests.length;
  await page.locator('#website').evaluate(input => { input.value = 'bot'; });
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  assert.equal(serviceRequests.length, before, 'Honeypot stops external requests');
  await page.locator('#website').evaluate(input => { input.value = ''; });
  await page.getByLabel('Your name', { exact: true }).fill('   ');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await page.getByRole('status').filter({ hasText: 'Please add your name' }).waitFor();
  assert.equal(serviceRequests.length, before, 'Whitespace names are not submitted');
  console.log('PASS honeypot and whitespace validation');

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    assert.deepEqual(accessibility.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
    console.log(`PASS ${width}px layout and accessibility`);
  }
  assert.deepEqual(runtimeErrors, []);
} finally {
  await browser.close();
}
