const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name);
  return new Promise((resolve, reject) => {
    fs.readFile(assetPath, { encoding: 'utf-8' }, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data.toString());
      }
    });
  });
};

const hostname = '127.0.0.1';
const port = 3000;

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status);

const router = {
  '/ GET': {
    asset: 'index.html',
    mime: mime.getType('html')
  },
  '/style.css GET': {
    asset: 'style.css',
    mime: mime.getType('css')
  }
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const route = url.parse(req.url).pathname;
  const match = router[`${route} ${method}`];
  if (!match) {
    res.writeHead(404);
    // res.write('not found');
    logRequest(method, route, 404);
    res.end();
    return;
  }
  res.writeHead(200, { 'Content-Type': match['mime'] });
  findAsset(match['asset'])
    .then((data) => {
      res.write(data);
      logRequest(method, route, 200);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
