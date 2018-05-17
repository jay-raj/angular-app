const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

// Point static path to dist
app.use(express.static(path.join('../',__dirname, 'dist/angular-app')));


// Route to test if EJS works
app.get('/testEjs', function(req, res){ 
 res.render('index',{user: "Great User",title:"homepage"});
}); 


// Route to test if Angular app is rendered
app.get('/angular*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`../dist/angular-app/${req.url.split("/")[3]}`));
  } else {
    res.sendFile(path.resolve('../dist/angular-app/index.html'));
  }
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));