import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
const root = 'C:\\Users\\ramsa\\Documents\\Codex\\Samir-Dev-Academy';
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};
http.createServer(async (req,res)=>{
  try{
    const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
    const p = pathname==='/' ? '/index.html' : decodeURIComponent(pathname);
    const data = await readFile(join(root, p));
    res.writeHead(200,{'Content-Type':types[extname(p)]||'application/octet-stream'});
    res.end(data);
  }catch{ res.writeHead(404); res.end('404'); }
}).listen(8099,'127.0.0.1',()=>console.log('Samir Dev Academy -> http://127.0.0.1:8099'));

