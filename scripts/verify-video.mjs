import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
  for(const width of [390,1440]){
    await page.setViewportSize({width,height:1000});
    const media=[];const record=r=>{if(new URL(r.url()).pathname.endsWith('.mp4'))media.push(r.url())};page.on('request',record);
    await page.goto('http://127.0.0.1:3000/work/theovision/',{waitUntil:'networkidle'});
    assert.equal(media.length,0,'Video should not download before playback');
    page.off('request',record);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Horizontal overflow');
    const video=page.locator('video');
    await video.scrollIntoViewIfNeeded();
    await video.evaluate(v=>v.play());
    await page.waitForFunction(()=>document.querySelector('video').currentTime>0.3);
    await video.evaluate(v=>{v.pause();v.currentTime=20});
    await page.waitForFunction(()=>!document.querySelector('video').seeking);
    assert.equal(await video.evaluate(v=>v.error),null);
    assert.ok(Math.abs(await video.evaluate(v=>v.duration)-30)<.2);
    assert.equal(await video.evaluate(v=>v.videoWidth),1920);
    for(const img of await page.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode())}
    const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    assert.deepEqual(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);
    await page.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0)});
    await page.screenshot({path:`/private/tmp/theovision-${width}.png`,fullPage:true});
    console.log(`PASS ${width}px: no initial video download; playback, seeking, images, layout, accessibility`);
  }
  await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle'});
  await page.getByRole('link',{name:'Explore Theovision International',exact:true}).click();
  await page.waitForURL('**/work/theovision/');
  assert.deepEqual(errors,[]);
  console.log('PASS project navigation and no runtime errors');
}finally{await browser.close()}
