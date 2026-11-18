import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const files=await fs.readdir('dist',{recursive:true});
const htmlFiles=files.filter(f=>f.endsWith('.html'));
const titles=new Set();
for(const name of htmlFiles){const html=await fs.readFile(path.join('dist',name),'utf8');assert.equal((html.match(/<h1\b/g)||[]).length,1,`${name}: one h1`);const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title),`duplicate title ${title}`);titles.add(title);assert(html.includes('name="description"'),`${name}: description`);assert(html.includes('<html lang="en">'));for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(match[1]);for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){const href=match[1];const dest=path.join('dist',href.endsWith('/')?href+'index.html':href);await fs.access(dest).catch(()=>assert.fail(`${name}: missing ${href}`));}}
const home=await fs.readFile('dist/index.html','utf8');assert(!home.includes('<iframe'),'Game must not load before click');assert(home.includes('https://playgama.com/export/game/drink-the-ocean'));assert(home.includes('<noscript>'));assert(home.includes('role="status"'));assert(home.includes('id="reload" disabled'));
console.log(`PASS: ${htmlFiles.length} pages, unique titles, one H1, metadata, JSON-LD, local links/assets, click-to-load and no-JS fallback.`);
