import http from 'node:http';
import { readFile } from 'node:fs/promises';
const assets = new Map([
  ['/', ['../public/index.html','text/html; charset=utf-8']],
  ['/app.mjs', ['../public/app.mjs','text/javascript; charset=utf-8']],
  ['/style.css', ['../public/style.css','text/css; charset=utf-8']],
  ['/domain.mjs', ['./domain.mjs','text/javascript; charset=utf-8']],
]);
const server=http.createServer(async(req,res)=>{
  const item=assets.get(new URL(req.url,'http://localhost').pathname);
  if(!item){res.writeHead(404);res.end('Not found');return;}
  try{const data=await readFile(new URL(item[0],import.meta.url));res.writeHead(200,{'Content-Type':item[1]});res.end(data);}
  catch{res.writeHead(500);res.end('Không đọc được file.');}
});
server.listen(4311,'127.0.0.1',()=>console.log('Mở http://127.0.0.1:4311 | Ctrl+C để dừng'));
