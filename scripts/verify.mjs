import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';

const browser = await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const context = await browser.newContext({reducedMotion:'reduce', permissions:['clipboard-read','clipboard-write']});
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
try {
  for (const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:1000});
    await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
    await page.evaluate(() => document.fonts.ready);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}`);
    for(const img of await page.locator('img:visible').all()){ await img.scrollIntoViewIfNeeded(); await img.evaluate(i=>i.decode()); }
    assert.equal(await page.locator('img:visible').evaluateAll(images => images.filter(i => !i.complete || i.naturalWidth === 0).length),0);
    const results = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    assert.deepEqual(results.violations.map(v => ({id:v.id,nodes:v.nodes.map(n=>n.target)})),[], `Accessibility at ${width}`);
    await page.evaluate(() => scrollTo(0,0));
    if(width === 390 || width === 1440) await page.screenshot({path:`/private/tmp/japhet-${width}.png`,fullPage:true});
    console.log(`PASS: ${width}px, no overflow, all images loaded, accessibility checks`);
  }
  await page.goto('http://127.0.0.1:3000/work/schoolpilot/',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Sign-in experience',exact:true}).click();
  assert.ok(await page.locator('.school-screen img').getAttribute('src').then(s=>s.includes('schoolpilot-login')));
  await page.getByRole('button',{name:'Enlarge SchoolPilot Sign-in experience',exact:true}).click();
  await page.getByRole('dialog',{name:'SchoolPilot Sign-in experience enlarged screenshot'}).waitFor({state:'visible'});
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.image-dialog').evaluate(d=>d.open),false);
  await page.getByRole('button',{name:'Product website',exact:true}).click();
  assert.ok(await page.locator('.school-screen img').getAttribute('src').then(s=>s.includes('schoolpilot-website')));
  await page.getByRole('button',{name:'Administration',exact:true}).click();
  await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Mobile',exact:true}).click();
  assert.equal(await page.locator('.project-card').count(),2);
  await page.getByRole('button',{name:'Explore Handy Man',exact:true}).click();
  await page.getByRole('dialog',{name:'Handy Man'}).waitFor({state:'visible'});
  const modalScan = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa']).analyze();
  assert.equal(modalScan.violations.length,0,JSON.stringify(modalScan.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.project-dialog').evaluate(d=>d.open),false);
  await page.getByRole('button',{name:'All work',exact:true}).click();
  assert.equal(await page.locator('.project-card').count(),5);
  await page.getByRole('button',{name:'Copy email address'}).click();
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'adjetadjetey45@gmail.com');
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Open navigation'}).click();
  await page.locator('#mobile-nav').getByRole('link',{name:'About'}).click();
  assert.equal(await page.locator('#mobile-nav').count(),0);
  assert.ok(page.url().endsWith('#about'));
  await page.evaluate(()=>{document.documentElement.style.fontSize='200%'});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),'Overflow at 200% font size');
  for(const width of [390,1440]){
    await page.setViewportSize({width,height:1000});
    await page.goto('http://127.0.0.1:3000/work/schoolpilot/',{waitUntil:'networkidle'});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Case study overflow');
    for(const img of await page.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());}
    const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    assert.deepEqual(scan.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    await page.screenshot({path:`/private/tmp/japhet-case-${width}.png`,fullPage:true});
    await page.getByRole('link',{name:'Back to selected work',exact:true}).click();
    await page.waitForURL('**/#work');
    console.log(`PASS: SchoolPilot walkthrough ${width}px, accessibility and return navigation`);
  }
  await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  assert.equal(await page.getByText('A better way to browse',{exact:true}).count(),0);
  await page.getByRole('link',{name:'Explore Parentfully',exact:true}).click();
  await page.waitForURL('**/work/parentfully/');
  assert.equal(await page.getByRole('link',{name:'Explore the live website'}).getAttribute('href'),'https://parentfullyapp.com/');
  assert.deepEqual(errors,[]);
  console.log('PASS: filtering, project dialog, Escape, clipboard, mobile navigation, 200% font size, no runtime errors');
} finally { await browser.close(); }
