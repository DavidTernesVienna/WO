import http from 'http';
import fs from 'fs';
import path from 'path';

const dist = path.resolve('dist');
const server = http.createServer((req, res) => {
  const filePath = path.join(dist, req.url === '/' ? '/index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).slice(1);
    const map = {html:'text/html', js:'application/javascript', json:'application/json', png:'image/png'};
    res.writeHead(200, {'Content-Type': map[ext] || 'text/plain'});
    res.end(data);
  });
});
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
