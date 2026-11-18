import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let filename=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(filename!==root&&!filename.startsWith(root+path.sep)){res.writeHead(403);return res.end();}try{if((await fs.stat(filename)).isDirectory())filename=path.join(filename,'index.html');}catch{}let data;try{data=await fs.readFile(filename);}catch{filename=path.join(root,'404.html');data=await fs.readFile(filename);res.statusCode=404;}res.setHeader('Content-Type',types[path.extname(filename)]||'application/octet-stream');res.end(data);}catch{res.writeHead(400);res.end('Bad request');}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
