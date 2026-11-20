import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const files=await fs.readdir('dist',{recursive:true});
const htmlFiles=files.filter(f=>f.endsWith('.html'));
const titles=new Set();
for(const name of htmlFiles){const html=await fs.readFile(path.join('dist',name),'utf8');assert.equal((html.match(/<h1\b/g)||[]).length,1,`${name}: one h1`);const title=html.match(/<title>(.*?)<\/title>/)[1];assert(!titles.has(title),`duplicate title ${title}`);titles.add(title);assert(html.includes('name="description"'),`${name}: description`);assert(html.includes('<html lang="en">'));for(const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(match[1]);for(const match of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){const href=match[1];const dest=path.join('dist',href.endsWith('/')?href+'index.html':href);await fs.access(dest).catch(()=>assert.fail(`${name}: missing ${href}`));}}
const home=await fs.readFile('dist/index.html','utf8');assert(!home.includes('<iframe'),'Game must not load before click');assert(home.includes('https://playgama.com/export/game/drink-the-ocean'));assert(home.includes('<noscript>'));assert(home.includes('role="status"'));assert(home.includes('id="reload" disabled'));
const headers=await fs.readFile('dist/_headers','utf8');
const robots=await fs.readFile('dist/robots.txt','utf8');
const sitemapDirectives=robots.split(/\r?\n/).filter(line=>/^Sitemap:/i.test(line));
const preview=/^\s*X-Robots-Tag:.*\bnoindex\b/im.test(headers);
const hasSitemap=files.includes('sitemap.xml');
const canonicalUrls=[];
for(const name of htmlFiles){
  const html=await fs.readFile(path.join('dist',name),'utf8');
  const unindexable=preview||name==='404.html';
  const pageRobots=html.match(/<meta name="robots" content="([^"]+)">/)?.[1]??'';
  assert.match(pageRobots,unindexable?/^noindex(?:,|$)/:/^index(?:,|$)/,`${name}: robots metadata`);
  const canonicals=[...html.matchAll(/<link rel="canonical" href="([^"]+)">/g)];
  if(name==='404.html') assert.equal(canonicals.length,0,'404 must not advertise a canonical');
  if(unindexable) continue;
  assert.equal(canonicals.length,1,`${name}: expected one canonical`);
  const canonical=new URL(canonicals[0][1]);
  const pagePath='/'+name.split(path.sep).join('/').replace(/index\.html$/,'');
  assert.equal(canonical.protocol,'https:',`${name}: canonical must use HTTPS`);
  assert.equal(canonical.href,canonical.origin+pagePath,`${name}: canonical must match its public route`);
  canonicalUrls.push(canonical.href);
}
if(preview){
  assert(!hasSitemap,'Preview must not publish a sitemap');
  assert.deepEqual(sitemapDirectives,[],'Preview must not advertise a sitemap');
}else{
  assert(hasSitemap,'Production must publish a sitemap');
  const origin=new URL(home.match(/<link rel="canonical" href="([^"]+)">/)[1]).origin;
  assert.deepEqual(sitemapDirectives,[`Sitemap: ${origin}/sitemap.xml`]);
  assert(canonicalUrls.every(url=>new URL(url).origin===origin),'Canonical URLs must share the homepage origin');
  const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
  const body=sitemap.match(/^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">([\s\S]*?)<\/urlset>\s*$/)?.[1];
  assert(body?.trim(),'Expected a nonempty XML sitemap with the standard namespace');
  const rows=[...body.matchAll(/<url>\s*<loc>([^<>]+)<\/loc>\s*<\/url>/g)];
  assert.equal(body.replace(/<url>\s*<loc>[^<>]+<\/loc>\s*<\/url>/g,'').trim(),'','Unexpected sitemap contents');
  assert.deepEqual(rows.map(row=>row[1]).sort(),canonicalUrls.sort(),'Sitemap must list each indexable canonical URL exactly once');
}
console.log(`PASS: ${htmlFiles.length} pages, metadata, local links, player fallback, canonical URLs and ${preview?'preview indexing rules':'production sitemap'}.`);
