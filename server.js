const path = require('path');
const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const rootDir = __dirname;

let app;
let useExpress = false;

try {
  const express = require('express');
  app = express();
  useExpress = true;
} catch (e) {
  // If express is not yet installed in node_modules, native http handles it seamlessly
  useExpress = false;
}

if (useExpress) {
  const express = require('express');

  // Serve all static files from root directory
  app.use(express.static(rootDir));

  // Route / to index.html
  app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
  });

  // Route /index2 to index2.html
  app.get('/index2', (req, res) => {
    res.sendFile(path.join(rootDir, 'index2.html'));
  });

  // Fallback to index.html for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (Express)`);
  });
} else {
  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ico': 'image/x-icon'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    if (reqPath === '/index2') reqPath = '/index2.html';

    const filePath = path.join(rootDir, reqPath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          fs.readFile(path.join(rootDir, 'index.html'), (e, indexContent) => {
            if (e) {
              res.writeHead(404, { 'Content-Type': 'text/plain' });
              res.end('Not Found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(indexContent, 'utf-8');
            }
          });
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (Native HTTP)`);
  });
}
